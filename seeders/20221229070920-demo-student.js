'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Students', [
      {
        code: 'd9efdcbc',
        fullName: 'Lerian Febriana',
        schools: 'SMK Manangga Pratama',
        class: 'XII TKR 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        code: '924b6a3d',
        fullName: 'Sopyan Sauri',
        schools: 'SMK Bina Mandiri',
        class: 'XII TKJ 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        code: 'b7b0c865',
        fullName: 'Asep Manarul',
        schools: 'SMK Bina Putra Nusantara',
        class: 'XII TL 3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Students', null, {});
  }
};
