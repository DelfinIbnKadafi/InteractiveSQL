const prompt = require("prompt-sync")({ sigint: true });

// return all column data
async function AllColumn(database, table) {
    const [rows] = await database.query(`SHOW COLUMNS FROM ${table}`);
    let column_list = [];

    for(const column of rows) {
        column_list.push(column.Field);
    }
    return column_list;
}

// get column data type
async function columnType(database, table, column) {
    const [rows] = await database.query(`SHOW COLUMNS FROM \`${table}\` LIKE ?`, [column]);

    if(rows.length === 0) return null;

    const raw = rows[0].Type.trim();

    // parse () as length
    const match = raw.match(/^([a-zA-Z]+)(?:\((.*)\))?/);

    if(!match) return null;

    return match[1].toLowerCase();
}

// console all column
async function showColumn(database, table) {
    const column_list = await AllColumn(database, table);
    console.log(column_list);
}

// insert data into column in table
async function insertColumn(database, table) {
    // get column first
    const column_list = await AllColumn(database, table);

    let column_dict = {};

    // loop column list and input to dict
    for(let i = 0; i < column_list.length; i++) {
        // init
        column_dict[column_list[i]] = {};

        column_dict[column_list[i]]["type"] = await columnType(database, table, column_list[i]);
        column_dict[column_list[i]]["value"] = prompt(` > ${column_list[i]} (${column_dict[column_list[i]]["type"]}) : `);
    }

    // prepare insert query
    const columns = Object.keys(column_dict);
    const values = Object.values(column_dict).map(data => data.value);

    const column_names = columns.map(column => `\`${column}\``).join(", ");
    const placeholders = columns.map(() => "?").join(", ");

    // execute insert query
    const [result] = await database.query(
        `INSERT INTO \`${table}\` (${column_names}) VALUES (${placeholders})`,
        values
    );

    console.log(`> Successfully inserted!`);

    return result;
}

module.exports = {
    showColumn,
    insertColumn
}