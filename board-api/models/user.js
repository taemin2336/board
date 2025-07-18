const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            email: {
               type: Sequelize.STRING(40),
               allowNull: false,
               unique: true,
            },
            name: {
               type: Sequelize.STRING(15),
               allowNull: false,
            },
            password: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true, //createAt, updateAt 자동 생성
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true, // deleteAt 자동생성, 소프트 삭제
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.User.hasMany(db.Board, {
         foreignKey: 'user_id',
         sourceKey: 'id',
      })
   }
}
