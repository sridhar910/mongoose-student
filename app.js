// app.js
// Mongoose Schema for Student and inserting records

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/schoolDB'; 
// For Atlas: 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/schoolDB?retryWrites=true&w=majority'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Define Student Schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    grade: String,
    email: String
});

// Create Student Model
const Student = mongoose.model('Student', studentSchema);

// Route to insert a new student
app.post('/add-student', async (req, res) => {
    const { name, age, grade, email } = req.body;
    const newStudent = new Student({ name, age, grade, email });
    try {
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});