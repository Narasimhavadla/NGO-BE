const sequelize = require("../config/db");

const createUsers = require("./userModal");
const createEvent = require("./events")
const createVolunteer = require("./volunteerModal")
const createDonation = require("./donation")
const createTeam = require("./team")
const createDonationPayments = require("./donationPayments")

const UserModel = createUsers(sequelize);
const EventsModel = createEvent(sequelize)
const VolunteerModal = createVolunteer(sequelize)
const DonationModal = createDonation(sequelize)
const TeamModal = createTeam(sequelize)
const DonationPaymentModal = createDonationPayments(sequelize)

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
  VolunteerModal,
  DonationModal,
  TeamModal,
  DonationPaymentModal,
};
