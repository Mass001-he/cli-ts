#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
const init_1 = require("./commands/init");
const component_1 = require("./commands/component");
const program = new commander_1.Command();
console.log(figlet_1.default.textSync("My CLI Tool"));
program.version("1.0.0").description("A modern frontend CLI tool");
program
    .command("init [project-name]")
    .description("Initialize new project")
    .option("-t, --template <template>", "Project template (react/vue)")
    .action(init_1.initProject);
program
    .command("component [name]")
    .description("Generate new component")
    .option("-d, --dir <directory>", "Output directory")
    .action(component_1.generateComponent);
program.parse(process.argv);
