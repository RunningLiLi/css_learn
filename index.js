const path = require("path");
const fs = require("fs");

const projectName = process.argv[2];
const templatePath = path.resolve(__dirname, "Template");
const projectPath = path.resolve(__dirname, projectName);
//递归遍历template目录下的文件
function cloneDir(src, dist) {
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
  }
  fs.readdir(src, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const itemPath = path.join(src, file);
      const item = fs.statSync(itemPath);
      if (!item.isDirectory()) {
        const distPath = path.join(dist, file);
        const code = fs.readFileSync(itemPath, "utf-8");
        fs.writeFileSync(distPath, code.replace("Template", projectName));
      } else {
        const subDir = path.join(dist, file);
        cloneDir(itemPath, subDir);
      }
    });
  });
}
cloneDir(templatePath, projectPath);
