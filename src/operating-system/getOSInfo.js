import os from 'node:os';
import { CustomError } from '../errors/CustomError.js';
import { OperationFailedError } from '../errors/OperationFailedError.js';
import { printCurrentDir } from '../messages/printCurrentDir.js';

export const getOSInfo = ([args]) => {
  try {
    switch (args) {
      case '--EOL':
        console.log(`System End-Of-Line:${JSON.stringify(os.EOL)}`);
        break;
      case '--cpus':
        const cpusInfo = os.cpus();
        const FormattedCpusInfo = cpusInfo.map(({ model, speed }) => ({
          model,
          'clock rate': `${Number(parseFloat(speed / 1000))} GHz`,
        }));

        console.log(`\nTotal number of CPUs: ${cpusInfo.length}`);
        console.table(FormattedCpusInfo);
        break;
      case '--homedir':
        console.log(`Home directory: ${os.homedir()}`);
        break;
      case '--username':
        console.log(`Current system username: ${os.userInfo().username}`);
        break;
      case '--architecture':
        console.log(`CPU architecture: ${os.arch()}`);
        break;
      default:
        throw new CustomError(`command 'os ${args}' not found`);
    }

    printCurrentDir();
  } catch (error) {
    if (error instanceof CustomError) console.log(error.message);

    throw new OperationFailedError('Operation failed');
  }
};
