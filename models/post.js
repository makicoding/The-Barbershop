module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    barber: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    time: {
      type: DataTypes.STRING,
      defaultValue: "",
      unique: true
    }
  });
  return Post;
};