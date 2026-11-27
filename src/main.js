#!/usr/bin/env node

const prompt = require("prompt-sync")({ sigint: true });

const { connect } = require("./mysql/connect");
const { openTable, showTable } = require("./mysql/table");

const { showHelp } = require("./utils");

async function main() {
    console.log("Interactive SQL 0.1.1\n");
    await new Promise(resolve => setTimeout(resolve, 2000));

    let response_connect = false;

    console.log("> Login to your database");

    let host_db;
    let user_db;
    let pass_db;
    let name_db;

    while(response_connect === false) { // if failed to connect, will return false
        host_db = prompt(" > Enter sql host : ");
        user_db = prompt(" > Enter sql username : ");
        pass_db = prompt.hide(" > Enter user password : ");
        name_db = prompt(" > Enter database name : ");

        response_connect = await connect(host_db, user_db, pass_db, name_db);
    }

    const database = response_connect;

    console.log("Succesfully connect to", name_db);

    let path = `${host_db}@${name_db}`;
    let table_now = null;
    let command  = "none"; // make the var changeable

    while(command !== "exit") {
        const prompt_path = `${path} -> `;
        command = prompt(prompt_path);
        if(command === "help") showHelp();

        // opentable
        if(command === "opentable") {
            // check if user already opened table
            if(table_now !== null) {
                console.log(" > You already opened table, use exittable to exit curently table.");
                continue;
            }

            const table_name = prompt(" > Table name : ");
            if(table_name.length < 1) {
                console.log(" > Length of table name must be more than 0!");
                return;
            }

            // check response from opentable, return true if succes, else false
            if(await openTable(database, table_name) === true) {
                // then change path and table now
                table_now = table_name;
                path = `${host_db}@${name_db}/${table_now}`;
                continue;
            }
            else {
                console.log(" > Cant find table!");
                continue;
            }
        }

        // exit curently table
        if(command === "exittable") {
            if(table_now === null) {
                console.log(" > You are not in any tables.");
                continue;
            }

            table_now = null;
            
            path = `${host_db}@${name_db}`;

            continue;
        }

        // list all table
        if(command === "listtable") {
            // check if user already opened table
            if(table_now !== null) {
                console.log(" > You already opened table, use exittable to exit curently table.");
                continue;
            }

            await showTable(database);
        }
    }

    return process.exit();
}

main();