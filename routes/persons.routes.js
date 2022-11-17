const express = require("express");
const router = express.Router();

const Person = require("../models/persons.model");

let persons = [
  // {
  //   id: 1,
  //   name: "Arto Hellas",
  //   number: "040-123456",
  // },
  // {
  //   id: 2,
  //   name: "Ada Lovelace",
  //   number: "39-44-5323523",
  // },
  // {
  //   id: 3,
  //   name: "Dan Abramov",
  //   number: "12-43-234345",
  // },
  // {
  //   id: 4,
  //   name: "Mary Poppendieck",
  //   number: "39-23-6423122",
  // },
];

// Info
router.get("/info", (request, response) => {
  response.end(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date().toString()}</p>`);
});

// Get all
router.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.status(200).json({ success: true, persons });
  });
});

// Get one
router.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id).then((person) => {
    // const person = persons.find((person) => person.id === id);
    if (!person) return response.status(404).json({ success: false, message: "Not found" });
    response.status(200).json({ success: true, person });
  });
});

// Delete one
router.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findOneAndDelete(id).then(() => {
    response.status(200).json({ success: true, message: "person deleted successfully" });
  });
  // persons = persons.filter((person) => person.id !== id);
});

// Post one
router.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) return response.status(500).json({ success: false, message: "name or number is empty" });
  if (persons.find((person) => person.name.toLowerCase() === body.name.toLowerCase()))
    return response.status(500).json({ success: false, message: "name must be unique" });
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then(() => {
    response.status(200).json({ success: true, person });
  });
});

module.exports = router;
