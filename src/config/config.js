// src/config/config.js
// src/config/config.js
import * as dotenv from 'dotenv';

import * as commander from 'commander';  // Cambiado aquí

const { Command } = commander;  // Modificado aquí

const program = new Command();

program
    .option('-d', 'Variable para debug', { noArgs: true })
    .option('-p <port>', 'Puerto del servidor', 9090)
    .option('--mode <mode>', 'Modo de trabajo', 'dev')

program.parse();

console.log("Mode Option: ", program.opts().mode);

const environment = program.opts().mode;

dotenv.config({
    path: environment === "prod" ? "./src/config/.env.production" : "./src/config/.env.development"
});

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
};
