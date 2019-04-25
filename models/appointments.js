module.exports = function (sequelize, DataTypes) {
  var Appointment = sequelize.define("Appointment", {
    appointment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointment_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    barber_name: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    barber_id: {
      type: DataTypes.INTEGER,
      defaultValue: ""
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
        len: [0,15]
      }
    }
  });
  return Appointment;
};