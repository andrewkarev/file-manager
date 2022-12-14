import { stdin as input, stdout as output } from 'node:process';
import { createInterface } from 'node:readline';

import { InvalidInputError } from './errors/InvalidInputError.js';
import { OperationFailedError } from './errors/OperationFailedError.js';

import { parseUsername } from './utils/getUsername.js';
import { greetUser } from './messages/greetUser.js';
import { sayBye } from './messages/sayBye.js';
import { printCurrentDir } from './messages/printCurrentDir.js';
import { goToHomeDir } from './navigation/goToHomeDir.js';
import { parseCommand } from './utils/parseCommand.js';
import { goUp } from './navigation/goUp.js';
import { goTo } from './navigation/goTo.js';
import { printDirItems } from './navigation/printDirItems.js';
import { read } from './operations-with-file/read.js';
import { create } from './operations-with-file/create.js';
import { rename } from './operations-with-file/rename.js';
import { remove } from './operations-with-file/delete.js';
import { copy } from './operations-with-file/copy.js';
import { move } from './operations-with-file/move.js';
import { getOSInfo } from './operating-system/getOSInfo.js';
import { printHash } from './operations-with-file/printHash.js';

const init = async () => {
  const username = parseUsername();

  greetUser(username);
  goToHomeDir();
  printCurrentDir();

  const rl = createInterface({ input, output });

  rl.on('line', async (input) => {
    try {
      const [command, ...args] = parseCommand(input);

      if (command === '.exit') rl.close();
      if (command === 'up') goUp();
      if (command === 'cd') goTo(args);
      if (command === 'ls') await printDirItems();
      if (command === 'cat') await read(args);
      if (command === 'add') await create(args);
      if (command === 'rn') await rename(args);
      if (command === 'cp') await copy(args);
      if (command === 'mv') await move(args);
      if (command === 'rm') await remove(args);
      if (command === 'os') getOSInfo(args);
      if (command === 'hash') await printHash(args);

      if (command === 'compress') {
      }
      if (command === 'decompress') {
      }
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
