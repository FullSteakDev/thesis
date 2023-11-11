const express = require('express')
const app = express()
const { PORT, CLIENT_URL } = require('./constants')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const path = require("path")
const cors = require('cors')


//import passport middleware
require('./middlewares/passport-middleware')

//initialize middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(passport.initialize())

if(process.env.NODE_ENV === "production") {
    // server static content
    // npm run build
    app.use(express.static(path.join(__dirname, "client/build")))
}

// impoort routes
const authRoutes = require('./routes/auth')

//initialize routes
app.use( authRoutes)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

//app start
const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`App is running on port ${PORT}`)
        })
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

appStart()