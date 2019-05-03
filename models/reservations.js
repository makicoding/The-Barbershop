// SEQUELIZE CODE

module.exports = function (sequelize, DataTypes) {
  var Reservation = sequelize.define("Reservation", {
    reservation_date: {
      type: DataTypes.STRING,
      defaultValue: "",

      // allowNull: false,
    },
    reservation_time: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    barber_name: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    customer_name: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    customer_email: {
      type: DataTypes.STRING,
      validate: {
      }
    },
    customer_phone: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 15]
      }
    }
  });
  return Reservation;
};