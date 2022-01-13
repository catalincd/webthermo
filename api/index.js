const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8008

var users = JSON.parse(fs.readFileSync("./users.json"))


const addUser = (
    username,
    password
) => {
    users.push({
        code: Buffer.from(password).toString('base64'),
        user: username,
        pass: password,
        thermos: []
    });
    fs.writeFile("./users.json", JSON.stringify(users), () => {});
    return Buffer.from(password).toString('base64');
}

const getUser = (username) => {
    for (var i = 0; i < users.length; i++)
        if (users[i].user == username)
            return users[i];

    return null;
}

const userExists = (username) => {
    return (getUser(username) != null)
}

app.use(express.json())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/isUsernameAvailable', (req, res) => {
    res.json(JSON.stringify({
        status: userExists(req.query.name)
    }));
})

app.post('/login', (req, res) => {


    const username = req.query.username;
    const password = req.query.password;

    for (var i = 0; i < users.length; i++)
        if (users[i].user == username) {
            res.json(JSON.stringify({
                status: true,
                code: users[i].code
            }));
            return;
        }

    res.json(JSON.stringify({
        status: false
    }));

})

app.post('/getThermos', (req, res) => {

    const username = req.query.username;
    const code = req.query.code;

    for (var i = 0; i < users.length; i++)
        if (users[i].user == username) {

            if (users[i].code != code) {
                res.json(JSON.stringify({
                    status: false
                }));
            } else {
                res.json(JSON.stringify({
                    status: true,
                    thermos: users[i].thermos
                }));
            }
            return;
        }

    res.json(JSON.stringify({
        status: false,
        info: "400"
    }));

})

app.post('/setThermos', (req, res) => {

    const username = req.query.username;
    const code = req.query.code;

    for (var i = 0; i < users.length; i++)
        if (users[i].user == username) {

            if (users[i].code != code) {
                res.json(JSON.stringify({
                    status: false
                }));
            } else {

                users[i].thermos = req.body
                fs.writeFile("./users.json", JSON.stringify(users), () => {});

                res.json(JSON.stringify({
                    status: true,
                }));
            }
            return;
        }

    res.json(JSON.stringify({
        status: false
    }));

})

app.post('/newUser', (req, res) => {

    const username = req.query.username;
    const password = req.query.password;

    if (userExists(username)) {
        res.json(JSON.stringify({
            status: false
        }));
    }

    userCode = addUser(username, password);

    res.json(JSON.stringify({
        status: true,
        code: userCode
    }));
})

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`)
})