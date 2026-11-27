const mysql = require("mysql2/promise");

async function showColumn(database, table) {
    const [rows] = await database.query(`SHOW COLUMNS FROM ${table}`);

    let column_list = [];

    for(const column of rows) {
        column_list.push(column.Field);
    }
    console.log(column_list);
    return true;
}

module.exports = {
    showColumn
}