module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamName: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Teams');
  }
};