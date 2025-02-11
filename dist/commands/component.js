"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateComponent = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const file_1 = require("../utils/file");
const logger_1 = require("../utils/logger");
const fs_1 = __importDefault(require("fs"));
const generateComponent = async (name, options) => {
    const answers = await inquirer_1.default.prompt([
        {
            type: "input",
            name: "componentName",
            message: "Component name:",
            validate: (input) => !!input,
            when: !name,
        },
    ]);
    const componentName = name || answers.componentName;
    const dir = options.dir || "src/components";
    try {
        const spinner = logger_1.logger.spinner().start("Generating component...");
        // 创建目录
        const componentDir = `${dir}/${componentName}`;
        file_1.file.createDir(componentDir);
        // 生成文件
        const template = `
import React from 'react';

export const ${componentName} = () => {
  return (
    <div>${componentName} Component</div>
  );
};
    `;
        fs_1.default.writeFileSync(`${componentDir}/index.tsx`, template);
        fs_1.default.writeFileSync(`${componentDir}/index.css`, "");
        spinner.succeed("Component created!");
    }
    catch (error) {
        logger_1.logger.error(`Component creation failed: ${error}`);
    }
};
exports.generateComponent = generateComponent;
