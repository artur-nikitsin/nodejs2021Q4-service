import pino from 'pino';
import * as fs from 'fs';
import process from 'node:process';
import { LoggerConfig } from '../loggerConfig';
import { WriteStream } from 'fs';
import { stdOutStream, writeOutStream } from './loggerTypes';

const loggerLevel: number | string = process.env.LOGGER_LEVEL || 4;

let loggerStreams: (
  | stdOutStream<string, typeof process.stdout>
  | writeOutStream<string, typeof fs.createWriteStream>
  | { level: string; stream: NodeJS.WriteStream & { fd: 1 } }
  | { level: string; stream: WriteStream }
)[] = [];

for (let i: number = +loggerLevel; i >= 0; i--) {
  if (i === LoggerConfig['all']) continue;
  const level: string = LoggerConfig[i];
  loggerStreams = [
    ...loggerStreams,
    { level: level, stream: process.stdout },
    {
      level: level,
      stream: fs.createWriteStream(`./logs/${level}.log`, { flags: 'a' }),
    },
  ];
}

export const logger = pino(
  {
    prettyPrint: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  },
  // @ts-ignore
  pino.multistream(loggerStreams)
);

process.on(
  'uncaughtException',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'uncaughtException');
    process.exit(1);
  })
);

process.on(
  'unhandledRejection',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'unhandledRejection');
    process.exit(1);
  })
);
