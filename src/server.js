const express = require('./lib')
const app = express()
const path = require('path')
const fs = require('fs')
let database = fs.readFileSync('./database/database.json', 'utf-8')
database = JSON.parse(database)

app.get('/api/users', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(database)
})

app.get('/api/foods', (req, res) => {
    var keys = Object.keys(database[0])
    let arr = []
    for (let i = 3; i < database.length+1; i++) {
        arr.push({
            FoodId: i-2,
            foodName: keys[i]
        })
    }
    res.json(arr)
})
app.get('/api/orders', (req, res) => {
    let arr = []
    for (let i = 0; i < database.length; i++) {
        arr.push({
            client_id: database[i].client_id,
            cola: database[i].cola,
            fanta: database[i].fanta,
            combo: database[i].combo

        })
    }
    res.json(arr)
})

app.post('/api/users', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let body = await req.body
    let obj = {
        client_id: Math.floor(Math.random() * 10558),
        username: body.username,
        telephone: body.telephone,
        cola: 0,
        fanta: 0,
        combo: 0
    }
    database.push(obj)
    console.log(database);
    fs.writeFileSync(path.join(__dirname, 'database', 'database.json'), JSON.stringify(database))
})

app.post('/api/orders', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    let body = await req.body
    console.log(body);
    let food = await body.food
    database[body.client_id-1][food[0]] = Number(database[body.client_id-1][food[0]] + +body[food[0]])
    fs.writeFileSync(path.join(__dirname, 'database', 'database.json'), JSON.stringify(database))
})


app.put('/put/users', async (req, res) => {
    var keys = Object.keys(database[0])
    let count = []
    let body = await req.body
    res.setHeader('Access-Control-Allow-Origin', '*');
    for(let key in body){
        if (keys.includes(key)) {
        
            if (key == 'client_id') {
                for (let i = 0; i < database.length; i++) {
                    if (database[i].client_id == body[key]) {
                        count.push(i)
                    }
                }
            }
            if (count.length && key == 'client_id' || key == 'client_id' || key == 'cola' || key == 'fanta' || key == 'combo') {
                continue
            }else{
                database[count[0]][key] = body[key]
            }
        }else{
            console.log('Bunday key database da yo\'q');
        }
    }  
    console.log(database);  
    fs.writeFileSync(path.join(__dirname, 'database', 'database.json'), JSON.stringify(database))
    res.end("end!")
})

app.put('/put/orders', async (req, res) => {
    let count = []
    let body = await req.body
    res.setHeader('Access-Control-Allow-Origin', '*');
    for(let key in body){
        if (key == 'client_id' || key == 'cola' || key == 'fanta' || key == 'combo') {
            if (key == 'client_id') {
                for (let i = 0; i < database.length; i++) {
                    if (database[i].client_id == body[key]) {
                        count.push(i)
                    }
                }
            }
            if (count.length && key == 'client_id' || key == 'telephone') {
                continue
            }else{
                database[count[0]][key] = body[key]
            }
        }else{
            console.log('Bunday key database da yo\'q yoki o\'zgartirib bo\'lmaydigan key kiritdingiz!');
        }
    }  
    fs.writeFileSync(path.join(__dirname, 'database', 'database.json'), JSON.stringify(database))
    res.end("end!")
})


app.delete('/delete/users', async (req, res) => {
    let newArr = []
    let count = 0
    res.setHeader('Access-Control-Allow-Origin', '*');
    let body = await req.body
    console.log(body);
    var keys = Object.keys(body)
    for(let key in body){
        if(body[key] == 'client_id' || keys.length == 1){
            for (let i = 0; i < database.length; i++) {
                if (database[i]['client_id'] != body['client_id']) {
                    newArr.push(database[i])
                }else{
                    count = 1
                }
            }
            
        }else{
            res.end("Iltimos bu yerga faqat client_id raqamini yuboring!")
            return
        }
        
    }

    if (count == 1) {
        fs.writeFileSync(path.join(__dirname, 'database', 'database.json'), JSON.stringify(newArr))
        res.end("Succesfully")
    }else{
        res.end("Katta ehtimol bilan siz kiritgan id raqam topilmadi :(")
    }
})



app.delete('/delete/orders', async (req, res) => {
    let count = 0
    let countjon = 0
    res.setHeader('Access-Control-Allow-Origin', '*');
    let body = await req.body
    console.log(body);
    var keys = Object.keys(body)
    for(let key in body){
        if(key == 'client_id'){
            for (let i = 0; i < database.length; i++) {
                if (database[i]['client_id'] == body['client_id']) {
                      countjon = 1
                }
            }
        }

        if(countjon != 1){
            res.end("Siz kiritgan ID raqamga teng bo'lgan user topilmadi")
            return
        }
        if(key == 'client_id' || key == 'cola' || key == 'fanta' || key == 'combo'){
            for (let i = 0; i < database.length; i++) {
                if (database[i]['client_id'] == body['client_id']) {
                    database[i][key] = body[key]
                    console.log(database[i][key]);
                    count = 1
                }else{
                }
            }
            
        }else{
            res.end("Invalid input")
            return
        }
        
    }

    if (count == 1) {
        fs.writeFileSync(path.join(__dirname, 'database', 'database.json'), JSON.stringify(database))
        res.end("Succesfully")
    }else{
        res.end("Katta ehtimol bilan siz to'g'ri ma'lumot kiritmagansiz :(")
    }
})

app.listen(5000, () => console.log('http://localhost:5000'))