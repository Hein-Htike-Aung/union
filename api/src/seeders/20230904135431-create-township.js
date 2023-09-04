'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const res = await queryInterface.sequelize.query(
      'select count(*) from township',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );

    const data = Object.values(res[0])[0];

    if (!data) {
      await queryInterface.bulkInsert('township', [
        {
          township: 'town 1',
          district_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          township: 'town 2',
          district_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          township: 'town 3',
          district_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          township: 'town 4',
          district_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          township: 'town 5',
          district_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          township: 'town 6',
          district_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          township: 'town 7',
          district_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          township: 'town 8',
          district_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          township: 'town 9',
          district_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          township: 'town 10',
          district_id: 5,
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
