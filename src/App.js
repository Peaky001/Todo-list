import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton 
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';  // Add this line

const theme = createTheme();

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos((prevTodos) => [...prevTodos, { id: Date.now(), text: newTodo }]);
      setNewTodo('');
    }
  };

  const editTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
    setNewTodo(todo.text);
  };

  const updateTodo = (e) => {
    e.preventDefault();
    setTodos(todos.map((todo) => (todo.id === currentTodo.id ? { ...todo, text: newTodo } : todo)));
    setIsEditing(false);
    setCurrentTodo({});
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Todo List
        </Typography>
        <form onSubmit={isEditing ? updateTodo : addTodo}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {isEditing ? 'Update Task' : 'Add Task'}
          </Button>
        </form>
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id}>
              <ListItemText primary={todo.text} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => editTodo(todo)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
};

export default App;

