const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    console.log('The / middleware');
    res.send('<h1>The middleware just send /</h1>')
})

module.exports = router