#!/usr/bin/env node
import { main } from "../src/main.js";

console.log("Interactive SQL 0.1.0\n");
await new Promise(resolve => setTimeout(resolve, 2000));

main();