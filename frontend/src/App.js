import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/todos', {
         title,
         content
         });
      setTodos([...todos, res.data]);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id, newTitle) => {
    try {
      const res = await axios.put(`http://localhost:5000/todos/${id}`, { title: newTitle });
      const updated = res.data;
      setTodos(prev =>
        prev.map(todo => (todo.id === id ? updated : todo))
      );
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const handleToggleComplete = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const res = await axios.put(`http://localhost:5000/todos/${id}`, {
        completed: !todo.completed,
      });
      const updated = res.data;
      setTodos(prev =>
        prev.map(t => (t.id === id ? updated : t))
      );
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  };

  const summarizeTodos = async () => {
    try {
      await axios.post('http://localhost:5000/summarize');
      setMessage('✅ Summary sent to Slack!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to send summary.');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
      <h1>📝 Todo Summary Assistant</h1>
      <input
        type="text"
        placeholder="Add todo..."
        value={title}

        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onEdit={handleEdit}
        onToggleComplete={handleToggleComplete}
      />

      <button onClick={summarizeTodos} style={{ marginTop: '1rem' }}>
        📤 Send Summary to Slack
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
