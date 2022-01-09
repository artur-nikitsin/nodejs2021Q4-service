import pino, { Logger, StreamEntry } from 'pino';
import * as fs from 'fs';
import process from 'node:process';
import { LoggerConfig } from '../loggerConfig';
import { LoggerTypes } from './loggerTypes';

const loggerLevel: number | string = process.env.LOGGER_LEVEL || 4;

let loggerStreams: StreamEntry[] = [];

for (let i: number = +loggerLevel; i >= 0; i--) {
  if (i === LoggerConfig['all']) continue;
  const level: LoggerTypes = LoggerConfig[i] as LoggerTypes;
  loggerStreams = [
    ...loggerStreams,
    { level, stream: process.stdout },
    {
      level,
      stream: fs.createWriteStream(`./logs/${level}.log`, { flags: 'a' }),
    },
  ];
}

export const logger: Logger = pino(
  {
    prettyPrint: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
    serializers: {
      res(reply) {
        return {
          method: reply.method,
          url: reply.url,
          path: reply.routerPath,
          statusCode: reply.statusCode,
          parameters: reply.params,
        };
      },
      req(request) {
        return {
          method: request.method,
          url: request.url,
          path: request.routerPath,
          parameters: request.params,
          headers: request.headers,
        };
      },
    },
  },

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
