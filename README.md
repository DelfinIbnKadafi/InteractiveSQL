# InteractiveSQL

InteractiveSQL is an interactive terminal-based SQL management tool.

## Requirements

- Node.js
- A MySQL database

## Installation

Install the package dependencies:

```sh
npm install
```

## Usage

Start the interactive CLI:

```sh
npm start
```

The program asks for:

- SQL host
- SQL username
- Password
- Database name

After a successful connection, the prompt uses the format:

```text
host@database ->
```

The prompt continues until the `exit` command is entered.

## Commands

| Command | Description |
| --- | --- |
| `exit` | Exit the program |
| `opentable` | Open a table in the connected database |
| `exittable` | Exit the currently opened table |
| `listtable` | List all tables in the connected database |
| `listcolumn` | List all column in the opened table |
| `help` | Show the command list |

When a table is open, the prompt changes to:

```text
host@database/table ->
```

## Contribute

You can contribute to this repo with fork and make pull request.

## License

Free to use, modify, and all you want to do.

MIT License
