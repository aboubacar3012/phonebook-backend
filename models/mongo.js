const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://aboubacar:${password}@cluster0.jcr8a99.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("persons", personSchema);

if (process.argv.length < 3) {
  console.log("Please provide the password as an argument: node mongo.js <password>");
  process.exit(1);
} else if (process.argv.length > 2 && process.argv.length <= 3) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");

      Person.find({})
        .then((persons) => {
          persons.map((person) => console.log(person));
          return mongoose.connection.close();
        })
        .then(() => {
          process.exit(1);
        });
    })

    .catch((err) => console.log(err));
}

if (process.argv.length > 3) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");

      const person = new Person({
        id: Date.now() * Math.floor(Math.random() * 9999),
        name: name,
        number: number,
      });

      return person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
      });

      // Note.find({ important: false }).then((notes) => {
      //   notes.map((note) => console.log(note));
      // });
      // return mongoose.connection.close();
    })
    .then(() => {
      console.log("note saved!");
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
