import { Readable } from "stream";

export const bufferToStream = (buffer: Buffer): Readable => {
  const stream = new Readable();
  stream._read = () => {};
  stream.push(buffer);
  stream.push(null);
  return stream;
};
