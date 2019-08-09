const express = require("express")

const server = express()

server.use(express.json())

let people = [
    {
        "person": "Steve",
        "userId": 1
    },
    {
        "person": "Susan",
        "userId": 2
    },
    {
        "person": "Jeff",
        "userId": 3
    },
]

let chores = [
    {
        "chore": "stuff",
        "userId": 1,
        "id": 1
    },
    {
        "chore": "things",
        "userId": 2,
        "id": 2
    },
    {
        "chore": "more things",
        "userId": 3,
        "id": 3
    }
]


// sanity check

server.get('/', (req, res) => {
    res.status(200).json({ message: 'api is running' })
})


// CREATE chores

server.post('/chores', (req, res) => {
    const newChore = req.body;
    console.log('new chore', newChore)

    if (newChore.chore && newChore.userId && newChore.id) {
        chores.push(newChore);
        res.status(201).json(newChore)
    } else {
        res.status(400).json({ error: 'required feilds: chore, userId, and id' })
    }
})


// READ chores

server.get('/chores', (req, res) => {
    res.status(200).json(chores)
})


// UPDATE chores

server.put('/chores/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    console.log('put', changes, id)

    chores.map(chore => {
        if (chore.id == id) {
            chore.chore = changes.chore
            res.status(200).json(chores)
        }
        console.log('chore id', chore.id)
    })
})


// DELETE chores

server.delete('/chores/:id', (req, res) => {
    const id = req.params.id;

    for (let i = 0; i < chores.length; i++) {
        if (chores[i].id == id) {
            chores.splice([i], 1)
            res.status(200).json(chores)
        }
    }
})


// GET chores by userId

server.get('/people/:id', (req, res) => {
    const id = req.params.id;
    let person = true

    chores.map(chore => {
        if (chore.userId == id) {
            res.status(200).json(chore)
        } else {
            person = false
        }
    })
    if (!person) {res.status(404).json({ error: 'person does not exist' })}
})

const port = process.env.PORT || 8000;
server.listen(port, () =>
    console.log(`api is running on port ${port}`)
)