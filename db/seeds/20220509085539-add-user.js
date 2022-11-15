'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordSupAdmin = await require('bcryptjs').hash(process.env.SUPERADMIN_PASSWORD, 10);
    await queryInterface.bulkInsert('Users', [
      {
        email: 'superadmin@gmail.com',
        userName: 'superadmin',
        password: passwordSupAdmin,
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
  }
};