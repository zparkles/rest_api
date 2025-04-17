import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()



export async function getUsers(){
    const [result] = await pool.query("SELECT * FROM users")
    return result
}

export async function getUser(username){
    const [result] = await pool.query(`SELECT * FROM users WHERE username = ?`, [username])
    return result[0] 
}

export async function createUser(name, username, email, password) {
    const [insert] = await pool.query(`INSERT INTO users (name, username, email, password ) VALUES (?, ?, ?, ?)`, 
        [name, username, email, password])
    const id = insert.insertId
    return getUser(id)
}

export async function deleteUser(id){
    await pool.query(`DELETE FROM users WHERE id = ?`, [id])
    
}

export async function updateUser(name, email, id){
    await pool.query(`UPDATE users SET name= ?, email=? WHERE id = ?`, [name, email, id] )
}



export default pool