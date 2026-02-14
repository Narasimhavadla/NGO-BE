const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()


const app = express()

app.use(express.json())
app.use(cors())


app.use("/api/v1/uploads", express.static("src/uploads"));


const {initDb,UserModel,EventsModel,VolunteerModal,DonationModal,TeamModal,DonationPaymentModal} = require("./src/modals")

const authRouters = require("./src/routes/authRouter")
const eventRouter = require("./src/routes/eventRouter")
const volunteerRouter = require("./src/routes/volunteer.router")
const donationRouter = require("./src/routes/donationRouter")
const teamRouter = require("./src/routes/teamRouter")
const donationPaymentRouter = require("./src/routes/paymentRoutes")


app.use((req, res, next) => {
  req.userModel = UserModel;
  req.EventsModel = EventsModel;
  req.VolunteerModal = VolunteerModal
  req.DonationModal = DonationModal
  req.TeamModal = TeamModal
  req.DonationPaymentModal = DonationPaymentModal

  next();
});


app.use("/api/v1",authRouters)
app.use("/api/v1",eventRouter)
app.use("/api/v1",volunteerRouter)
app.use("/api/v1",donationRouter)
app.use("/api/v1",teamRouter)
app.use("/api/v1",donationPaymentRouter)



const server = app.listen(3000,() =>{
    console.log("server is running at port 3000")
})

initDb().catch((err) =>{
    console.log("DB init Failed :",err)
    server.close(() => process.exit(1))
})