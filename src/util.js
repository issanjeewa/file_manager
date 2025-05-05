import path from 'path';
import fs from 'fs/promises';

const cdFunc = async (currentDir, dir) => {
  const targetPath = path.isAbsolute(dir) ? dir : path.join(currentDir, dir);

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

export { cdFunc, lsFunc };
