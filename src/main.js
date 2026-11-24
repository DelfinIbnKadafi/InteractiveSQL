#!/usr/bin/env node

const prompt = require("prompt-sync")({ sigint: true });

const { connect } = require("./mysql/connect");

async function main() {
    console.log("Interactive SQL 0.1.0\n");
    await new Promise(resolve => setTimeout(resolve, 2000));

    let response_connect = false;

    console.log(">> Login to your database");

    let host_db;
    let user_db;
    let pass_db;
    let name_db;

    while(response_connect === false) { // if failed to connect, will return false
        host_db = prompt("  > Enter sql host : ");
        user_db = prompt("  > Enter sql username : ");
        pass_db = prompt.hide("  > Enter user password : ");
        name_db = prompt("  > Enter database name : ");

        response_connect = await connect(host_db, user_db, pass_db, name_db);
    } 

    console.log("Succesfully connect to", name_db);

    let path = `${host_db}@${name_db}`;
    let command  = "none"; // make the var changeable

    while(command != "exit") {
        const prompt_path = `${path} -> `;
        command = prompt(prompt_path);
        if(prompt === "exit") process.exit();
    }

    return;
}

main();