import path from 'path';
import fs from 'fs/promises';

const cdFunc = async (currentDir, dir) => {
  const targetPath = path.isAbsolute(dir) ? dir : path.resolve(currentDir, dir);

  try {
    const stats = await fs.stat(targetPath);
    if (stats.isDirectory()) {
      return targetPath;
    } else {
      console.log(`Does not exists: ${targetPath}`);
    }
  } catch (error) {
    console.log(`Error while changing directory: ${error?.message}`);
  }
};

const lsFunc = async (currentDir) => {
  try {
    const items = await fs.readdir(currentDir, { withFileTypes: true });

    const dirs = items
      .filter((file) => file.isDirectory())
      .map((dir) => ({ name: dir.name, type: 'directory' }));

    const files = items
      .filter((file) => file.isFile())
      .map((file) => ({ name: file.name, type: 'file' }));

    const sortedItems = [
      ...dirs.sort((a, b) => a.name.localeCompare(b.name)),
      ...files.sort((a, b) => a.name.localeCompare(b.name)),
    ];

    if (!!sortedItems?.length) {
      console.table(sortedItems);
    } else {
      console.log(`Directory is empty`);
    }
  } catch (error) {
    console.log(`Error while listing directory: ${error?.message}`);
  }
};

const catFunc = async (currentDir, fileName) => {
  const filePath = path.isAbsolute(fileName)
    ? fileName
    : path.resolve(currentDir, fileName);

  try {
    const stats = await fs.stat(filePath);
    if (!stats.isFile()) {
      console.log(`Does not exists: ${filePath}`);
      return;
    }

    const fileContent = await fs.readFile(filePath, 'utf-8');
    console.log(fileContent);
  } catch (error) {
    console.log(`Error while reading file: ${error?.message}`);
  }
};

const addFunc = async (currentDir, fileName) => {
  const filePath = path.isAbsolute(fileName)
    ? fileName
    : path.resolve(currentDir, fileName);

  try {
    await fs.writeFile(filePath, '', { flag: 'wx' });
  } catch (error) {
    if (error.code === 'EEXIST') console.log('File already exists');
    else console.log(`Error while creating file: ${error?.message}`);
  }
};

export { cdFunc, lsFunc, catFunc, addFunc };
