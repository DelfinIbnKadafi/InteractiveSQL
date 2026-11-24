const mysql = require("mysql2/promise");

async function connect(host, user, pass, dbname) {
    try {
        const db = mysql.createConnection({
            host: host,
            user: user,
            password: pass,
            database: dbname
        });

        const connection = await db;
        return connection;
    }
    catch(error) {
        console.error("  > Connection failed ->", error.message);
        return false;
    }
}

module.exports = {
    connect
};