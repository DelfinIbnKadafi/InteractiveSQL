const helptext = ` > Command List
   exit - exit the programs
   opentable - open table in database
   exittable - exit current table
   listtable - list all tables
   listcolumn - list all column
   insert - insert data to column in a table
`;

function showHelp() {
    return console.log(helptext);
}

module.exports = {
    showHelp
}