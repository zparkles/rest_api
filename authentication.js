import express from 'express';
import bodyParser from 'body-parser';
import { getUsers, getUser, createUser, deleteUser, updateUser } from './database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = 4000;

app.use(bodyParser.json())

app.post('/users/login', async(req,res)=> {
    const user = await getUser(req.body.username)
    const accessToken = generateAccessToken(user)
    if (!user) {
        return res.status(400).send("Can't find user")
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            res.json({accessToken: accessToken})
            res.send('Success')
        }
        else{
            res.send('Wrong password!')
        }
    }
    catch{
        res.status(500).send()
    }
})


function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'})
}




app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))