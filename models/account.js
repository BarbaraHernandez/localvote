module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accountId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Account.associate = function(models) {
  //   Account.hasMany(models.Post, {
  //     onDelete: "cascade"
  //   });
  // };
  return Account;
};
