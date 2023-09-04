'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const res = await queryInterface.sequelize.query(
      'select count(*) from state',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );

    const data = Object.values(res[0])[0];

    if (!data) {
      await queryInterface.bulkInsert('state', [
        {
          state: 'Rakhine',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          state: 'Kayar',
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
