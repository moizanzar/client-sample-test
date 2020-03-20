require('dotenv').config();
exports.getConfig = () => {
  return {
    "development": {
      "username": process.env.USER_NAME,
      "password": process.env.PASSWORD,
      "database": process.env.DB_NAME,
      "host": process.env.HOST,
      "dialect": "mysql",
      "logging": false,
      "define": {
        "underscored": true,
        "timestamps": true
      },
      "timezone": "+00:00"
    },
    "production": {
      "username": process.env.USER_NAME,
      "password": process.env.PASSWORD,
      "database": process.env.DB_NAME,
      "host": process.env.HOST,
      "dialect": "mysql",
      "logging": false,
      "define": {
        "underscored": true,
        "timestamps": true
      },
      "timezone": "+00:00"
    }
  }
}  