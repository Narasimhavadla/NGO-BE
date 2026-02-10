const sequelize = require("../config/db");

const createUsers = require("./userModal");
const createEvent = require("./events")

const UserModel = createUsers(sequelize);
const EventsModel = createEvent(sequelize)

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB Connected");

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
      console.log("✅ DB Synced (Alter Mode)");
    } else {
      await sequelize.sync();
      console.log("✅ DB Synced");
    }
  } catch (err) {
    console.error("❌ DB Connection Failed!", err);
  }
};

module.exports = {
  initDb,
  UserModel,
  EventsModel,
};
