const mysql = require("mysql2/promise");

// return all column data
async function AllColumn(database, table) {
    const [rows] = await database.query(`SHOW COLUMNS FROM ${table}`);
    let column_list = [];

    for(const column of rows) {
        column_list.push(column.Field);
    }
    return column_list;
}

// console all column
async function showColumn(database, table) {
    const column_list = await AllColumn(database, table);
    console.log(column_list);
}

module.exports = {
    showColumn
}