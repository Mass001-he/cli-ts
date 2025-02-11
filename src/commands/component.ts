import inquirer from "inquirer";
import { file } from "../utils/file";
import { logger } from "../utils/logger";
import fs from "fs";

export const generateComponent = async (
  name: string,
  options: { dir?: string }
) => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "componentName",
      message: "Component name:",
      validate: (input: string) => !!input,
      when: !name,
    },
  ]);

  const componentName = name || answers.componentName;
  const dir = options.dir || "src/components";

  try {
    const spinner = logger.spinner().start("Generating component...");

    // 创建目录
    const componentDir = `${dir}/${componentName}`;
    file.createDir(componentDir);

    // 生成文件
    const template = `
import React from 'react';

export const ${componentName} = () => {
  return (
    <div>${componentName} Component</div>
  );
};
    `;

    fs.writeFileSync(`${componentDir}/index.tsx`, template);
    fs.writeFileSync(`${componentDir}/index.css`, "");

    spinner.succeed("Component created!");
  } catch (error) {
    logger.error(`Component creation failed: ${error}`);
  }
};
