import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayPersons from './components/DisplayPersons'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import personService from './services/persons'

const App = () => {

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="notif">
        {message}
      </div>
    )
  }
  const ErrorMessage = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(x => x.name).includes(newName)) {
      if (window.confirm(`${newName} is already in phonebook, replace the old number with the new one?`)){
        const p = persons.find(x => x.name === newName).id
        //console.log(p)
        changeNumber(p)
        return
      }
      else return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    //console.log(personObject)
    personService
    .create(personObject)
    .then(response => {
        //console.log(response)
        setPersons(persons.concat(response))
        setNotif(
          `${newName} was added to phonebook`
        )
        setTimeout(() => {
          setNotif(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = id => {
    const deletingName = persons.find(x => x.id === id).name
    if (window.confirm(`Delete ${deletingName}?`)) {
      personService.remove(id)
      setPersons(persons.filter(x => (x.id !== id)))
      setNotif(
          `${deletingName} was removed from phonebook`
        )
        setTimeout(() => {
          setNotif(null)
        }, 5000)
    }
  }

  const changeNumber = id => {
    const p = persons.find(x => x.id === id)
    const updatedPerson = {...p, number: newNumber}
    personService
      .update(id, updatedPerson)
        .then(response => {
        setPersons(persons.map(x => x.id === id ? response : x))
        setNotif(
          `Number of${newName} was changed`
        )
        setTimeout(() => {
          setNotif(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrNotif(
          `${newName} has already been removed from the server`
        )
        setTimeout(() => {
          setErrNotif(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
        setNewName('')
        setNewNumber('')
      })
  }

  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [notif, setNotif] = useState(null)
  const [errNotif, setErrNotif] = useState(null)

  const hook = () => {
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleChange2 = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const filterResults = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterResults={filterResults}/>
      <h2>Add new person</h2>
      <Notification message={notif}/>
      <ErrorMessage message={errNotif}/>
      <AddPerson addPerson={addPerson} newName={newName} newNumber={newNumber} handleChange={handleChange} handleChange2={handleChange2}/>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )

}

export default App