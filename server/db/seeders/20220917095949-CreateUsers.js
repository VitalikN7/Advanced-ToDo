'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: "admin",
        password: '$2b$05$YHBMU9VwHpxt0edpu/zmdemg55NhFeR8DDft8OJnI1fPIdoef8fiO',
        email: 'admin@todo.ru',
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
