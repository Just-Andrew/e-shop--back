const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv/config")
const signupRouter = require("./routes/users/signup")
const loginRouter = require("./routes/users/login")
const authRouter = require("./routes/users/auth")
const watchRouter = require("./routes/watches/watch")
const app = express()


/* middlewares */
app.use(cors())
app.use(express.json({ extended: true }))
/* users routes */
app.use("/signup", signupRouter)
app.use("/login", loginRouter)
app.use("/auth", authRouter)
/* watches routes */
app.use("/watch", watchRouter)

async function start() {
    /* Connection to MongoDB */
    const port = process.env.PORT || 4000
    try {
        await mongoose.connect(
            process.env.DB_connection,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }
        )
        /* REST API launch */
        app.listen(port, () => console.log(`App has been run on port ${port}...`))
    } catch (error) {
        console.log("server Err", error.message)
        process.exit(1)
    }
}

start()