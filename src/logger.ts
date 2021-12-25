import pino from 'pino';
import * as fs from 'fs';
import process from 'node:process';

type levels =
  | 'info'
  | 'fatal'
  | 'error'
  | 'warn'
  | 'debug'
  | 'trace'
  | undefined;

const level: levels = 'info';

type stdOutStream<T, StdOut> = { level: T; stream: StdOut };
type writeOutStream<T, WriteStream> = { level: T; stream: WriteStream };

const loggerLevel: number | string = process.env.LOGGER_LEVEL || 4;

const streams = [
  { level: level, stream: process.stdout },
  {
    level: level,
    stream: fs.createWriteStream('./logs/info.log', { flags: 'a' }),
  },
];

export const logger = pino(
  {
    prettyPrint: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  },
  pino.multistream(streams)
);

process.on(
  'uncaughtException',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'uncaughtException');
    process.exit(1);
  })
);
