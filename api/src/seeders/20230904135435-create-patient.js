'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const res = await queryInterface.sequelize.query(
      'select count(*) from patient',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );

    const data = Object.values(res[0])[0];

    if (!data) {
      await queryInterface.bulkInsert('patient', [
        {
          name: 'Mg Mg',
          phone: '09234325235',
          age: 39,
          address: 'Ndy street',
          township_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Hla',
          phone: '09234323424',
          age: 20,
          address: 'Boyar street',
          township_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'John',
          phone: '09877456546',
          age: 59,
          address: 'Panchaung street',
          township_id: 1,
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
