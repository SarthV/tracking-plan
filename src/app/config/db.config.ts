require('dotenv').config();

const connectionConfig = {
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  port: 3306,
};


export default connectionConfig;