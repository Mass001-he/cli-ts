import fs from "fs";
import path from "path";
import shelljs from "shelljs";

export const file = {
  copyTemplate: (source: string, dest: string) => {
    shelljs.cp(
      "-R",
      path.join(__dirname, "../../templates", source, "*"),
      dest
    );
  },

  createDir: (dir: string) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  },
};
