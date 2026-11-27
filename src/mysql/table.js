const mysql = require("mysql2/promise");

async function openTable(database, tablename) {
    const [rows] = await database.query(
        "SHOW TABLES LIKE ?",
        [tablename]
    );

    if(rows.length > 0) return true;
    return false;
}

async function showTable(database) {
    const [rows] = await database.query('SHOW TABLES');

    const tableNames = rows.map(row => Object.values(row)[0]);

    console.log(tableNames);
}

module.exports = {
    openTable,
    showTable
}