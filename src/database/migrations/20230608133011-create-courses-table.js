'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('courses', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      synopsis: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      thumbnail_url: {
        type: Sequelize.DataTypes.STRING,
      },
      featured: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      category_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'categories', key: 'id' },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('courses')
  }
};
