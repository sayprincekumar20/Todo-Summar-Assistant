// index.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Read and write from todos.json
const getTodos = () => {
  const data = fs.readFileSync('todos.json', 'utf-8');
  return JSON.parse(data);
};

const saveTodos = (todos) => {
  fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
};


//  Get/ todos
app.get('/todos', (req, res) => {
  const todos = getTodos();
  res.json(todos);
});

// // POST /todos – Add a new todo
// app.post('/todos', (req, res) => {
//   const todos = getTodos();
//   const { title } = req.body;

//   if (!title) {
//     return res.status(400).json({ error: 'Title is required' });
//   }

//   const newTodo = {
//     id: Date.now(), // unique ID based on timestamp
//     title,
//     completed: false,
//     createdAt: new Date().toISOString(), 
//   };

//   todos.push(newTodo);
//   saveTodos(todos);
//   res.status(201).json(newTodo);
// });

//PUT
app.put('/todos/:id', (req, res) => {
  const todos = getTodos();
  const todoIndex = todos.findIndex(todo => todo.id == req.params.id);
  if (todoIndex === -1) return res.status(404).send('Todo not found');

  todos[todoIndex].title = req.body.title || todos[todoIndex].title;
  todos[todoIndex].content = req.body.content ?? todos[todoIndex].content;
  todos[todoIndex].completed = req.body.completed ?? todos[todoIndex].completed;

  saveTodos(todos);
  res.json(todos[todoIndex]);
});

//Toggle
app.patch('/todos/:id/toggle', (req, res) => {
  const todos = getTodos();
  const todo = todos.find(todo => todo.id == req.params.id);
  if (!todo) return res.status(404).send('Todo not found');
  
  todo.completed = !todo.completed;
  saveTodos(todos);
  res.json(todo);
});


// POST/ todos
app.post('/todos', (req, res) => {
  const todos = getTodos();
  const newTodo = {
   id: Date.now(),
   title: req.body.title,
   content: req.body.content || '',
   completed: false,
   createdAt: new Date()
  };
  todos.push(newTodo);
  saveTodos(todos);
  res.status(201).json(newTodo);
});

//Delete /todos/:id
app.delete('/todos/:id', (req, res) => {
  let todos = getTodos();
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  saveTodos(todos);
  res.status(200).json({ message: 'Todo deleted' });
});


//Post/ summarize
app.post('/summarize', async (req, res) => {
  try {
    const todos = getTodos();
    const todoText = todos.map(t => `- ${t.content}`).join('\n');

    const prompt = `Summarize the following list of todos into 3–5 bullet points:\n${todoText}`;

    const openaiRes = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: prompt }
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    const summary = openaiRes.data.choices[0].message.content;

    // Send to Slack
    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `📋 Todo Summary:\n${summary}`
    });

    res.status(200).json({ message: 'Summary sent to Slack successfully!' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to generate or send summary' });
  }
});

// strat the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

