module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accountCookie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accountId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Account.associate = function(models) {
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };
  return Account;
};
