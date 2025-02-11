#!/usr/bin/env node

import { Command } from "commander";
import figlet from "figlet";
import { logger } from "./utils/logger";
import { initProject } from "./commands/init";
import { generateComponent } from "./commands/component";

const program = new Command();

console.log(figlet.textSync("My CLI Tool"));

program.version("1.0.0").description("A modern frontend CLI tool");

program
  .command("init [project-name]")
  .description("Initialize new project")
  .option("-t, --template <template>", "Project template (react/vue)")
  .action(initProject);

program
  .command("component [name]")
  .description("Generate new component")
  .option("-d, --dir <directory>", "Output directory")
  .action(generateComponent);

program.parse(process.argv);
