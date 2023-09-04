'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const res = await queryInterface.sequelize.query(
      'select count(*) from role',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );

    const data = Object.values(res[0])[0];

    if (!data) {
      await queryInterface.bulkInsert('role', [
        {
          role_name: 'Admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_name: 'ME Manager',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_name: 'Project Manager',
          created_at: new Date(),
          updated_at: new Date(),
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
