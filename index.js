const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
let notes = [];

// Get all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Create a new note
app.post('/api/notes', (req, res) => {
  const note = req.body;
  notes.push(note);
  res.status(201).json(note);
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    const deletedNote = notes.splice(index, 1)[0];
    res.json(deletedNote);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

app.put('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedNote = req.body;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index].text = updatedNote.text;
    notes[index].date = updatedNote.date;
    res.json(updatedNote);
	res.send("Updated Successfully!")
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
