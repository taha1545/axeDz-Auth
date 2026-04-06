require('dotenv').config();

const db = require('./db/models');
const app = require('./Routes');

const PORT = process.env.APP_PORT || 3000;
db.sequelize
  .sync()
  .then(() => {
    console.log('Database auth is connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });
