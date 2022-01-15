import dotenv from 'dotenv';
dotenv.config();
import app from './app';

dotenv.config();
const port: number | string = process.env.PORT || 4000;

app
  .listen(port, '0.0.0.0')
  .then(() => {
    process.stdout.write(`Server listening at http://127.0.0.1:${port}`);
  })
  .catch((error: Error) => {
    app.log.fatal(error.message);
    process.exit(1);
  });
