module.exports = function(sequelize, DataTypes) {
  var Proposal = sequelize.define("Post", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Proposal.associate = function(models) {
    Proposal.belongsTo(models.Account, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
