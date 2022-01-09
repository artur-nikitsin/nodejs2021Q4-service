export type LoggerTypes =
  | 'info'
  | 'fatal'
  | 'error'
  | 'warn'
  | 'debug'
  | 'trace'
  | undefined;

export type stdOutStream<T, StdOut> = { level: T; stream: StdOut };
export type writeOutStream<T, WriteStream> = { level: T; stream: WriteStream };
