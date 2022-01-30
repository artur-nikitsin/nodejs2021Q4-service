import { extname } from 'path';

export const editFileName = (
  req: never,
  file: { originalname: string },
  callback: (arg0: null, arg1: string) => void
) => {
  const fileExtName = extname(file.originalname);
  const randomName = Array(10)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${randomName}${fileExtName}`);
};
