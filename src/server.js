const express = require('express')
const routes = require('./routes')

require('./database')

const app = express()

// Lidar com reqs que vem no formato de JSON
app.use(express.json())

app.use(routes)

app.listen(3333)
