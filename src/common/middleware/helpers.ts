import { writeFile, readFile, appendFile } from 'fs/promises';

export const writeLogs = async (data: string) => {
  try {
    await readFile('logs.log', { encoding: 'utf-8' });
    await appendFile('logs.log', data + '\n');
  } catch (error) {
    const file = await writeFile('logs.log', data + '\n');
  }
};
