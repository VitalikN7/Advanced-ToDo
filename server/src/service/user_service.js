const { User } = require('../../db/models')
const bcrypt = require('bcrypt')
const tokenService = require('./token_service')
const UserDto = require('../dtos/user_dtos')
const ApiError = require('../errors/apiError')

class UserService {

   async registragion(username, email, password) {
      const personName = await User.findOne({ where: { username: username } })
      if (personName) {
         throw ApiError.BadRequest(`Пользователь с никнейм ${username} уже существует `)
      }
      const personEmail = await User.findOne({ where: { email: email } })
      if (personEmail) {
         throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует `)
      }
      const hashedPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
         username: username,
         email: email,
         password: hashedPassword,
         role: 'USER'
      })
      const userDto = new UserDto(user)
      const tokens = tokenService.generateTokens({ ...userDto })
      await tokenService.saveToken(userDto.id, tokens.refreshToken)
      return { ...tokens, user: userDto }
   }

   async login(email, password) {
      const personEmail = await User.findOne({ where: { email: email } })
      if (!personEmail) {
         throw ApiError.BadRequest(`Пользователь с таким ${email} не найден`)
      }
      const isPassEquals = await bcrypt.compare(password, personEmail.password)
      if (!isPassEquals) {
         throw ApiError.BadRequest('Неверный пароль или email')
      }
      const userDto = new UserDto(personEmail)
      const tokens = tokenService.generateTokens({ ...userDto })
      await tokenService.saveToken(userDto.id, tokens.refreshToken)
      return { ...tokens, user: userDto }
   }

   async logout(refreshToken) {
      const token = await tokenService.removeToken(refreshToken)
      return token
   }

   async refresh(refreshToken) {
      if (!refreshToken) {
         throw ApiError.UnauthorizedError();
      }
      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);
      if (!userData || !tokenFromDb) {
         throw ApiError.UnauthorizedError();
      }
      const user = await User.findOne({ where: { id: userData.id } });
      const userDto = new UserDto(user)
      const tokens = tokenService.generateTokens({ ...userDto })
      await tokenService.saveToken(userDto.id, tokens.refreshToken)
      return { ...tokens, user: userDto }
   }
}

module.exports = new UserService()