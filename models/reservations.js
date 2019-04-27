module.exports = function (sequelize, DataTypes) {
  var Reservation = sequelize.define("Reservation", {
    reservation_date: {
      type: DataTypes.STRING,
      defaultValue: "",

      // allowNull: false,
    },
    reservation_time: {
      type: DataTypes.TIME,
      // allowNull: false,
    },
    barber_name: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    barber_id: {
      type: DataTypes.INTEGER
      // defaultValue: ""
    },
    customer_first_name: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    customer_last_name: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    customer_email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
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