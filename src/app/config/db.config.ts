require('dotenv').config();

const connectionConfig = {
  type: 'mysql',
  charset: 'utf8',
  driver: 'mysql',
  username: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  port: 3306,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
};


export = connectionConfig;