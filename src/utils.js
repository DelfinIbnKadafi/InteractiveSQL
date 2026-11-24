const helptext = ` > Command List
   exit - exit the programs
   opentable - open table in database
   exittable - exit current table
`;

function showHelp() {
    return console.log(helptext);
}

module.exports = {
    showHelp
}