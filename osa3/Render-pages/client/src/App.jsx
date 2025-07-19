import React, {useState, useEffect} from 'react'
import PersonsServise from "./persons"
import { Message, ErrorMessage } from "./Message"

const PersonForm = ({newName, newNumber, nameFieldChange, numberFieldChange, addPerson}) => {
    return (
    <form>
        <div>name: <input value={newName} onChange={nameFieldChange}/></div>
        <div>number: <input value={newNumber} onChange={numberFieldChange}/></div>

        <div>
            <button onClick={addPerson} type="submit">add</button>
        </div>
    </form>
    )
}

const Persons = ({persons, newFilter, deletePerson}) => {

    return (
    <ul>
        {persons.filter(person => {
        if (!person.name || !person.number) return false
        return person.name.toLowerCase().includes(newFilter.toLowerCase()) ||
        person.number.includes(newFilter)})
        .map(filteredPerson => (
            <li key={filteredPerson.id}>
                {filteredPerson.name}: {filteredPerson.number}
                <button onClick={() => deletePerson(filteredPerson.id, filteredPerson.name)}>delete</button>
            </li>
        ))}
    </ul>
    )
}

const Filter = ({newFilter, filterFieldChange}) => {
    return (
        <div> 
            filter shown with <input value={newFilter} onChange={filterFieldChange} />
            </div>
    )
}

const App = () => {

    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [newFilter ,setNewFilter] = useState("")

    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const hook = () => {
        PersonsServise
        .getAll()
        .then(initialPerson => {
            setPersons(initialPerson)
        })
    }

    useEffect(hook, [])

    

    const nameFieldChange = (event) => {
        setNewName(event.target.value)
    }
    const numberFieldChange = (event) => {
        setNewNumber(event.target.value)
    }

    const filterFieldChange = (event) => {
        setNewFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()

        const nameExists = persons.some(person => person.name === newName)
        
        if (!nameExists) {
            const personObject = {
                name: newName,
                number: newNumber
            }
            
            PersonsServise
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName("")
                    setNewNumber("")
                    sendMessage(`${newName} added`)
                }).catch(error => {
                    sendError(error.response.data.error)
                })
        } else {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {

                const personToUpdate = persons.find(p => p.name === newName)
                const updatedPerson = {...personToUpdate, number: newNumber}
                
                PersonsServise
                    .update(personToUpdate.id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== personToUpdate.id ? p: returnedPerson))
                        sendMessage(`${newName} number has changed`)
                    })
                    .catch(error => {
                        sendError(`Person ${newName} was already removed from server`)
                    })
            }
        }
        setNewName("")
        setNewNumber("")
    }

    const deletePerson = (id, name) => {
        if (window.confirm(`delete ${name}?`)) {
            PersonsServise
                .remove(id)
                .then(() => {
                    setPersons(prev => prev.filter(p=> p.id !== id))
                    sendMessage(`${name} deleted`)
                })
                .catch(error => {
                    sendError(`Person '${name}' was already removed from server`)
                    setPersons(prev => prev.filter(p=> p.id !== id))
                })
        }
    }

    const sendMessage = (message) => {
        setMessage(message)

        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const sendError = (message) => {
        setErrorMessage(message)

        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    return (
        <div>
            <h1>Phonebook</h1>

            <Message message={message} />
            <ErrorMessage message={errorMessage} />

            <Filter newFilter={newFilter} filterFieldChange={filterFieldChange}/>

            <h2>Add a new</h2>
            
            <PersonForm newName={newName} newNumber={newNumber} 
            nameFieldChange={nameFieldChange} numberFieldChange={numberFieldChange} 
            addPerson={addPerson}/>

            <h2>Numbers:</h2>

            <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson}/>
            
        </div>
    )

}

export default App