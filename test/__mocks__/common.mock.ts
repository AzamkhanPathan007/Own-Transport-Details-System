import { Readable } from 'node:stream';

export const createMockReadable = (data: string) => {
  const readable = new Readable();
  readable.push(data);
  readable.push(null);
  return readable;
};
