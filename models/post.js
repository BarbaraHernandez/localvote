module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
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
