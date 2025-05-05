const express = require('express');
const cors = require('cors');
const pool = require('./db')

const app = express();
app.use(express.json())

app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})
app.use(cors());

app.post('/todos',async (req,res)=>{
    try {
        const {title,description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todos (title,description) VALUES ($1,$2) RETURNING *", [title,description]
        );
res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/todos',async (req,res)=>{
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todos"
        )
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message)
    }
})

app.get("/todos/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const todo = await pool.query(
            "SELECT * FROM todos WHERE id = $1",[id]
        )
        res.json(todo.rows[0])
    } catch (error) {
        console.log(error.message)
        
    }
})

app.put("/todos/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const isCompleted = await pool.query(
            "UPDATE todos SET is_completed = NOT is_completed WHERE id = $1 RETURNING *",[id]
        )
        res.json(isCompleted.rows[0])
    } catch (error) {
        console.log(error)
    }
})

app.delete("/todos/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todos WHERE id= $1",[id]
        )
        res.json("Todo was deleted");
    } catch (error) {
        console.log(error.message)
    }
});