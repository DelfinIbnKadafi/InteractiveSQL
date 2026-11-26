const mysql = require("mysql2/promise");

async function openTable(database, tablename) {
    const [rows] = await database.query(
        "SHOW TABLES LIKE ?",
        [tablename]
    );

    if(rows.length > 0) return true;
    return false;
}

module.exports = {
    openTable
}