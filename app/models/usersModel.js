module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: 1,
      autoIncrement: 1
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  }, 
  {
    tableName: 'users',
    timestamps: false
  });

  return Users;
};
