import express from 'express';
import bodyParser from 'body-parser';
import { getUsers, getUser, createUser, deleteUser, updateUser } from './database.js'
import { getName, getNIM, getYMD } from './query.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = 5000;



app.use(bodyParser.json())


app.get('/data', authenticateToken,async(req, res)=> {
    const {NAMA, NIM, YMD} = req.body
    if (NAMA && !NIM && !YMD) {
        const foundName = await getName(NAMA)
        if (foundName.length > 0)  {res.send(foundName)}
        else { res.send("Data not found")}

    }
    else if(NIM && !NAMA && !YMD){
        const foundNIM = await getNIM(NIM)
        if (foundNIM.length > 0)  {res.send(foundNIM)}
        else { res.send("Data not found")}
        

    }
    else if(YMD && !NIM && !NAMA){
        const foundYMD = await getYMD(YMD)
        if (foundYMD.length > 0)  {res.send(foundYMD)}
        else { res.send("Data not found")}

    }
    else { res.send("Can only search for either NAMA or NIM or YMD")}
  
})




app.get('/users',authenticateToken, async (req, res)=> {
    const username = req.body.username
    const user = await getUser(username);
    if (user) {
    console.log(user);
    res.send(user); }
    else {
        console.log("User doesn't exist")
        res.send("User doesn't exist")}
 
})

app.post('/users', async(req, res)=> {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const { name, username, email} = req.body
        const user = await createUser(name, username, email, hashedPassword)
        res.status(201).send(`User with the name ${name} added`)
  
   
})


app.delete('/users', authenticateToken, async(req, res) => {
    const username = req.body.username
    const user = await getUser(username);
    const toBeDeleted = await deleteUser(user.id)
    res.send(`User ${user.id} has been deleted`)
})

app.patch('/users', authenticateToken, async(req,res)=> {
    const {name, email, username} = req.body
    const user = await getUser(username)
    const update = await updateUser(name, email, user.id)
    res.send(`User ${name}'s data updated`)
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if (err) return res.sendStatus(403)
            req.user = user
        next()

    })

}

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))