const express = require('express')
const app = express()
const port = 3000

const database = require('./database.js')

app.get('/', (req, res) => {
    database.getQuestions("tst", 5).then((promise) => {
        res.send(promise)
    })
})

app.listen(port, () => {
  console.log(`CapstoneFirstDraft listening at http://localhost:${port}`)
})
