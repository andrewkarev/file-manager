import { stdin as input, stdout as output } from 'node:process';
import { createInterface } from 'node:readline';

import { InvalidInputError } from './errors/InvalidInputError.js';
import { OperationFailedError } from './errors/OperationFailedError.js';

import { parseUsername } from './utils/getUsername.js';
import { greetUser } from './messages/greetUser.js';
import { sayBye } from './messages/sayBye.js';
import { printCurrentDir } from './messages/printCurrentDir.js';
import { parseCommand } from './utils/parseCommand.js';
import { getOSInfo } from './operating-system/getOSInfo.js';
import * as fo from './operations-with-file/index.js';
import * as nav from './navigation/index.js';

const init = async () => {
  const username = parseUsername();

  greetUser(username);
  nav.goToHomeDir();
  printCurrentDir();

  const rl = createInterface({ input, output });

  rl.on('line', async (input) => {
    try {
      const [command, ...args] = parseCommand(input);

      if (command === '.exit') rl.close();
      if (command === 'up') nav.goUp();
      if (command === 'cd') nav.goTo(args);
      if (command === 'ls') await nav.printDirItems();
      if (command === 'cat') await fo.read(args);
      if (command === 'add') await fo.create(args);
      if (command === 'rn') await fo.rename(args);
      if (command === 'cp') await fo.copy(args);
      if (command === 'mv') await fo.move(args);
      if (command === 'rm') await fo.remove(args);
      if (command === 'os') getOSInfo(args);
      if (command === 'hash') await fo.printHash(args);
      if (command === 'compress') await fo.compress(args);
      if (command === 'decompress') await fo.decompress(args);
    } catch (error) {
      if (error instanceof InvalidInputError) console.log(error.message);
      if (error instanceof OperationFailedError) console.log(error.message);

      printCurrentDir();
    }
  });

  rl.on('SIGINT', () => rl.close());
  rl.on('close', () => sayBye(username));
};

await init();
