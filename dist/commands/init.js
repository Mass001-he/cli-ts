"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProject = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const file_1 = require("../utils/file");
const logger_1 = require("../utils/logger");
const shelljs_1 = __importDefault(require("shelljs"));
const initProject = async (projectName, options) => {
    const questions = [];
    if (!projectName) {
        questions.push({
            type: "input",
            name: "projectName",
            message: "Project name:",
            validate: (input) => /^[a-z\-]+$/.test(input),
        });
    }
    if (!options.template) {
        questions.push({
            type: "list",
            name: "template",
            message: "Choose template:",
            choices: ["react", "vue"],
        });
    }
    const answers = await inquirer_1.default.prompt(questions);
    const finalName = projectName || answers.projectName;
    const template = options.template || answers.template;
    console.log("template===>", finalName, template);
    try {
        const spinner = logger_1.logger.spinner().start("Creating project...");
        // 创建目录
        file_1.file.createDir(finalName);
        // 复制模板
        file_1.file.copyTemplate(template, finalName);
        // 安装依赖
        shelljs_1.default.cd(finalName);
        shelljs_1.default.exec("npm install");
        spinner.succeed("Project created successfully!");
        logger_1.logger.success(`
      Next steps:
        cd ${finalName}
        npm run dev
    `);
    }
    catch (error) {
        logger_1.logger.error(`Creation failed: ${error}`);
        process.exit(1);
    }
};
exports.initProject = initProject;
