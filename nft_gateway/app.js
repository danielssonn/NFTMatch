const express = require('express')
const bodyParser = require('body-parser')
const handleURIRequest = require('./index').handleURIRequest
const handleMatchRequest = require('./index').handleMatchRequest


const app = express()
const port = process.env.EA_PORT || 8080

app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Postman for below APIs:
 * https://www.getpostman.com/collections/6df3296f6a359d9dac70
 */


/**
 * Standalone API service that calls into blockchain to retrieve token uri link
 */

app.post('/token-uri', async (req, res) => {
    console.log('POST Data: ', req.body)

    handleURIRequest(req.body, (status, result) => {
        console.log('Result: ', result)
        res.status(status).json(result)
    })
})
/**
 * NFTPort API service that matches token
 */
app.post('/api-match', async (req, res) => {
    console.log('POST Data: ', req.body)

    handleMatchRequest(req.body, (status, result) => {
        console.log('Result: ', result)
        res.status(status).json(result)
    })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))