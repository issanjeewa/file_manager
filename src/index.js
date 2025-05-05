import readline from 'readline';
import { stdin, stdout } from 'process';
import path from 'path';
import os from 'os';
import { catFunc, cdFunc, lsFunc } from './util.js';

const fileManager = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  const args = process.argv.slice(2);
  const username =
    args?.find((arg) => arg.startsWith('--username='))?.split('=')[1] ||
    'Anonymous';

  let currentDir = os.homedir();

  console.log(`Welcome to the File Manager, ${username}!`);

  console.log(`You are currently in ${currentDir}`);

  rl.setPrompt(`> `);
  rl.prompt();

  rl.on('line', async (input) => {
    const [command, ...args] = input.trim().split(' ');

    switch (command) {
      case '':
        break;

      case '.exit':
        console.log(
          `\nThank you for using File Manager, ${username}, goodbye!`
        );
        rl.close();
        break;

      case 'up':
        currentDir = path.resolve(currentDir, '..');
        break;

      case 'cd':
        if (!args.length) {
          console.log(`Invalid input`);
          break;
        }

        const dir = args[0];
        currentDir = (await cdFunc(currentDir, dir)) || currentDir;
        break;

      case 'ls':
        await lsFunc(currentDir);
        break;

      case 'cat':
        if (!args.length) {
          console.log(`Invalid input`);
          break;
        }
        await catFunc(currentDir, args[0]);
        break;

      default:
        console.log(`Invalid input`);
        break;
    }

    console.log(`You are currently in ${currentDir}`);
    rl.prompt();
  });

  rl.on('close', () => process.exit(0));

  process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    rl.close();
  });
};

fileManager();
