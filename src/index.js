import readline from 'readline';
import { stdin, stdout } from 'process';

const fileManager = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  const args = process.argv.slice(2);
  const username =
    args?.find((arg) => arg.startsWith('--username='))?.split('=')[1] ||
    'guest';

  let currentDir = process.cwd();

  console.log(`Welcome to the File Manager, ${username}!`);

  process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    rl.close();

    setTimeout(() => process.exit(0), 100);
  });
};

fileManager();
