const express = require("express")

const server = express()

server.get('/', (req, res) => {
    res.status(200).json({ message: 'api is running' })
})

const port = process.env.PORT || 8000;
server.listen(port, () =>
    console.log(`api is running on port ${port}`)
)