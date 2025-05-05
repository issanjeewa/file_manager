import path from 'path';
import fs from 'fs/promises';

const cdFunc = async (currentDir, dir) => {
  try {
    const targetPath = path.isAbsolute(dir)
      ? dir
      : path.resolve(currentDir, dir);

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
  try {
    const filePath = path.isAbsolute(fileName)
      ? fileName
      : path.resolve(currentDir, fileName);

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
  try {
    const filePath = path.isAbsolute(fileName)
      ? fileName
      : path.resolve(currentDir, fileName);

    await fs.writeFile(filePath, '', { flag: 'wx' });
  } catch (error) {
    if (error.code === 'EEXIST') console.log('File already exists');
    else console.log(`Error while creating file: ${error?.message}`);
  }
};

const mkdirFunc = async (currentDir, dirName) => {
  try {
    const dirPath = path.isAbsolute(dirName)
      ? dirName
      : path.resolve(currentDir, dirName);

    await fs.mkdir(dirPath, { recursive: false });
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.log('Directory already exists');
    } else {
      console.log('Error while creating directory:', error.message);
    }
  }
};

const renameFunc = async (currentDir, filePath, newName) => {
  try {
    const originalFile = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(currentDir, filePath);

    const dstPath = path.join(path.dirname(originalFile), newName);

    await fs.rename(originalFile, dstPath);
  } catch (error) {
    console.log(`Error while renaming: ${error?.message}`);
  }
};

export { cdFunc, lsFunc, catFunc, addFunc, mkdirFunc, renameFunc };
