import inquirer from "inquirer";
import { file } from "../utils/file";
import { logger } from "../utils/logger";
import shelljs from "shelljs";
import { UnnamedDistinctQuestion } from "inquirer/dist/commonjs/types";

export const initProject = async (
  projectName: string,
  options: { template?: string }
) => {
  const questions: (UnnamedDistinctQuestion<{ [x: string]: any }> & {
    name: string;
  })[] = [];
  if (!projectName) {
    questions.push({
      type: "input",
      name: "projectName",
      message: "Project name:",
      validate: (input: string) => /^[a-z\-]+$/.test(input),
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

  const answers = await inquirer.prompt(questions);
  const finalName = projectName || answers.projectName;
  const template = options.template || answers.template;
  console.log("template===>", finalName, template);

  try {
    const spinner = logger.spinner().start("Creating project...");

    // 创建目录
    file.createDir(finalName);

    // 复制模板
    file.copyTemplate(template, finalName);

    // 安装依赖
    shelljs.cd(finalName);
    shelljs.exec("npm install");

    spinner.succeed("Project created successfully!");
    logger.success(`
      Next steps:
        cd ${finalName}
        npm run dev
    `);
  } catch (error) {
    logger.error(`Creation failed: ${error}`);
    process.exit(1);
  }
};
