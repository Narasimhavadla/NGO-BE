const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()


const app = express()

app.use(express.json())
app.use(cors())


app.use("api/v1/uploads", express.static("src/uploads"));


const {initDb,UserModel,EventsModel} = require("./src/modals")

const authRouters = require("./src/routes/authRouter")
const eventRouter = require("./src/routes/eventRouter")


app.use((req, res, next) => {
  req.userModel = UserModel;
  req.EventsModel = EventsModel;
  next();
});


app.use("/api/v1",authRouters)
app.use("/api/v1",eventRouter)



const server = app.listen(3000,() =>{
    console.log("server is running at port 3000")
})

initDb().catch((err) =>{
    console.log("DB init Failed :",err)
    server.close(() => process.exit(1))

})