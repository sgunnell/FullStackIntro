const mongoose = require('mongoose')


const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.q433yv5.mongodb.net/phonebookApp?retryWrites=true&w=majority`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

if (process.argv.length === 3){
  console.log('3 arguments providing fetching all database entries')

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })


}

else if (process.argv.length === 5) {
  console.log(`5 arguments provided adding ${process.argv[3]} number ${process.argv[4]} to phonebook`)

  const person = new Person({
    'name': process.argv[3],
    'number': process.argv[4],
  })

  person.save().then(() => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}