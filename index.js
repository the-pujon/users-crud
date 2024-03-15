
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userController = require('./src/Controllers/users.controllers');
require('dotenv').config()
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check MongoDB connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Check for MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(cors())

// CRUD Routes
app.post('/users', userController.createUser);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

app.get('/', (req,res)=>{
    res.status(400).send({message:'Welcome to the User API'})
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
