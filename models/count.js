module.exports = function(sequelize, DataTypes) {
  var Count = sequelize.define("Count", {
    postId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // accountId: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    choice: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  return Count;
};
