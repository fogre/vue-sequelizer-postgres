require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;
const DEFAULT_PASS = process.env.DEFAULT_PASS;
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3001;
const SECRET = process.env.SECRET;

module.exports = {
  DATABASE_URL,
  DEFAULT_PASS,
  ENV,
  PORT,
  SECRET
}