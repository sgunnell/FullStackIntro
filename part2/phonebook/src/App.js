import { useState, useEffect } from 'react';

import Persons from "./components/Persons";
import Form from "./components/Form";
import InputField from './components/InputField';
import React from 'react';
import personService from './services/persons';
import Notification from './components/Notification';


const App = (props) => {
  
  const [persons, setPersons] = useState('') 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null);




  useEffect(() => {

    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
  }, [])
  
  useEffect(() => {
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  }, [notificationMessage]);

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPersons(filtered)
  }

  
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const alreadyExists = persons.some((person)=>person.name===newName)

    if (newName===""){
      return;
    }
    if (alreadyExists){
      const person = persons.find((p) => p.name === newName);
      const changedPerson = { ...person, number: newNumber };
      const { id } = person;
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      console.log("updating person with:",changedPerson)

      if (newNumber < 8) {
        setNotificationMessage({
          text: `${newNumber} is too short, please provide a number with at least 8 digits`,
          type: "error",
        });
        return;
      }

      if (confirmUpdate) {
        personService
          .update(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((person) => person.id !== id ? person : returnedPerson)); 
            setNotificationMessage({text:`${newName} Updated`, type: "notification"})
          })
          .catch((error)=>{
            setNotificationMessage({text:`${newName} was already removed from server`, type: "error"})
            })
          }
          
      }
    
    else{ 
      personService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNotificationMessage({ text: `Added ${newName}`, type: "notification" });
      })
      .catch((error) => {
        setNotificationMessage({
          text: error.response.data,
          type: "error",
        });
      })
    }
      setNewName('')
      setNewNum('')
    
  }
  const handleDelete = (id) => {
    console.log('deletion of ' + id + ' needs to be toggled')
    const person = persons.find((p)=>p.id===id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)
    console.log(confirmDelete)
    if (confirmDelete) {
      personService.deletePerson(id)
      .then(()=>{
        const filteredPersons = persons.filter( (person) => person.id!==id)
        setPersons(filteredPersons)
        setFilter("")
        setNotificationMessage({text:`${person.name} Deleted`,type:"notification"})
      })
      .catch((err) => {
        setNotificationMessage({
          text: `${person.name} was already removed from server`,
          type: "error",
        });
      })
    }
  }





  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <InputField 
          label="Filter shown with:"
          type="text"
          value= {filter}
          onChange= {handleFilterChange}
          />
      <h2> add a new</h2>
      <Form
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <div>
        <Persons filter={filter} persons={persons} filteredPersons={filteredPersons} handleDelete={handleDelete}/>
      </div>
    </div>
  )
}

export default App