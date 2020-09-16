module.exports = (sequelize, Sequelize) => {
  const UsersLogin = sequelize.define("users_login", {
    login_id: {
      type: Sequelize.INTEGER,
      primaryKey: 1,
      autoIncrement: 1
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: 0
    },
    logged_out: {
      type: Sequelize.BOOLEAN,
      allowNull: 0,
			defaultValue: 0
    },
    ip_address: {
      type: Sequelize.STRING,
      allowNull: 1
    },
    token_id: {
      type: Sequelize.STRING,
      allowNull: 1
    },
    device: {
			type: Sequelize.STRING,
			allowNull: 1
		}
  }, 
  {
    tableName: 'users_login',
    timestamps: false
  });

  return UsersLogin;
};
