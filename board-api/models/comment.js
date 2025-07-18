const Sequelize = require('sequelize')

module.exports = class Comment extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            content: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
            user_name: {
               type: Sequelize.STRING(15),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: true, // createdAt, updatedAt 자동생성
            underscored: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Comment.belongsTo(db.Board, {
         foreignKey: 'board_id',
         targetKey: 'id',
         onDelete: 'CASCADE',
      })
      db.Comment.belongsTo(db.User, {
         foreignKey: 'user_id',
         targetKey: 'id',
         onDelete: 'CASCADE',
      })
   }
}
