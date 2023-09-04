'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const res = await queryInterface.sequelize.query(
      'select count(*) from district',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );

    const data = Object.values(res[0])[0];

    if (!data) {
      await queryInterface.bulkInsert('district', [
        {
          district: 'dis 1',
          state_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          district: 'dis 2',
          state_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          district: 'dis 3',
          state_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          district: 'dis 4',
          state_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          district: 'dis 5',
          state_id: 2,
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
