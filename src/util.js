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

export { cdFunc };
