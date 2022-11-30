// подключение к серверу
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cokieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3002
const path = require('path');
const logger = require('morgan');
const errorMiddleware = require('./middleware/errorMiddleware')
// промежуточные обработчики
app.use(logger('dev'));
app.use(express.static(path.resolve('src/public')));
app.use(express.json());
app.use(cokieParser());
const corsOptions = {
   origin: ['http://localhost:3000'],
   optionsSuccessStatus: 200,
   credentials: true
}
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware)
// подключение базы данных	
const { sequelize } = require('../db/models')
// подключение router
const home = require('./routes/home')
const auth = require('./routes/auth')
// запросы на сервер
app.use('/', home)
app.use('/auth', auth)
// проверка что сервак работает вместе с базой данных
app.listen(PORT, async () => {
   console.log(`Server starting on POPT: ${PORT}`);
   try {
      await sequelize.authenticate();
      console.log('BD connect online');
   } catch (error) {
      console.log(error, 'Noooooo BD crash');
   }
});