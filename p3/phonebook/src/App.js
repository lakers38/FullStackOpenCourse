import React, { useState, useEffect} from 'react'
import Contact from './components/Contact'
import axios from 'axios'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import personService from './services/persons'
const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ filteredPersons, setFilteredPersons] = useState(persons)
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
    }, [])

  

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    const isSame = (contact) => contact.name === newName
    if (persons.findIndex(isSame) === -1) {
      personService.create(contactObject)
           .then(returnedPerson => {
             setPersons(persons.concat(returnedPerson))
             setNewName('')
             setNewNumber('')
           })
      
    } else {
      const message = `${newName} is already added to phonebook`
      const result = window.confirm(message)
      if (result) {
        const person = persons[persons.findIndex(isSame)]
        const changedContact  = {...contactObject, number: newNumber}
        personService.putNew(person.id, changedContact).then(response => {
          setPersons(persons.map(person => person.name !== changedContact.name ? person : response))
        })
      }
    }
    
  }

  const removeContact = (person) => {
    const result = window.confirm(`Delete ${person.name}?`)
    if (result) {
      personService.remove(person.id)
                    .then(response => {
                      setPersons(persons.filter(p => p.name !== person.name))
                    })
                    .catch(error => {
                      console.log(error)
                      setNotification({"message" : `${person.name} could not be deleted`, "status" : "error"})
                    })
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handle = {handleFilterChange}/>
      <h2>add a new</h2>
      <ContactForm add = {addContact} newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Numbers persons = {persons} newFilter = {newFilter} handler = {removeContact}/>
    </div>
  )
}
export default App