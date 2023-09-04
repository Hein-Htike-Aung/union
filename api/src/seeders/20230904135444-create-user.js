'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(+process.env.SALT);
    const password = bcrypt.hashSync('union2023', salt);

    const res = await queryInterface.sequelize.query(
      'select count(*) from user',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );

    const data = Object.values(res[0])[0];

    if (!data) {
      await queryInterface.bulkInsert('user', [
        {
          username: 'Admin user',
          password,
          email: 'union2023@gmail.com',
          created_at: new Date(),
          updated_at: new Date(),
          role_id: 1,
          township_id: 1,
        },
        {
          username: 'ME user',
          password,
          email: 'me_user@gmail.com',
          created_at: new Date(),
          updated_at: new Date(),
          role_id: 2,
          township_id: 2,
        },
        {
          username: 'Project manager user',
          password,
          email: 'pm_user@gmail.com',
          created_at: new Date(),
          updated_at: new Date(),
          role_id: 3,
          township_id: 3,
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
