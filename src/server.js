const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 4000;
const start = async () => {
  try {
    await app.listen(port);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start().then(() => {
  process.stdout.write(`Server listening at http://127.0.0.1:${port}`);
});
