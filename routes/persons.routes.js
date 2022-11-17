const express = require("express");
const router = express.Router();
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Info
router.get("/info", (request, response) => {
  response.end(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date().toString()}</p>`);
});

// Get all
router.get("/api/persons", (request, response) => {
  response.status(200).json({ success: true, persons });
});

// Get one
router.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) return response.status(404).json({ success: false, message: "Not found" });
  response.status(200).json({ success: true, person });
});

// Delete one
router.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(200).json({ success: true, message: "person deleted successfully" });
});

// Post one
router.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) return response.status(500).json({ success: false, message: "name or number is empty" });
  if (persons.find((person) => person.name.toLowerCase() === body.name.toLowerCase()))
    return response.status(500).json({ success: false, message: "name must be unique" });
  const newPerson = {
    name: body.name,
    number: body.number,
    id: persons[persons.length - 1].id + 1 || 1,
  };
  persons = [...persons, newPerson];
  response.status(200).json({ success: true, persons });
});

module.exports = router;
