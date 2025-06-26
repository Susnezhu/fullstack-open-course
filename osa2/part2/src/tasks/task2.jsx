import axios from 'axios'
import {useState, useEffect} from 'react'

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

const Persons = ({persons, newFilter}) => {
    return (
    <ul>
        {persons.filter(person => 
        person.name.toLowerCase().includes(newFilter.toLowerCase()) ||
        person.number.includes(newFilter))
        .map(filteredPerson => (
            <li key={filteredPerson.name}>
                {filteredPerson.name}: {filteredPerson.number}
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


const Task2 = () => {

    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [newFilter ,setNewFilter] = useState("")

    const hook = () => {
        axios
        .get(('http://localhost:3001/persons'))
        .then(response => {
            setPersons(response.data)
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
                number: newNumber}

            setPersons(persons.concat(personObject))
            setNewName("")
            setNewNumber("")
        } else {
            alert(`${newName} is already added to phonebook`)
            setNewName("")
            setNewNumber("")
        }
    }

    return (
        <div>
            <h1>Phonebook</h1>

            <Filter newFilter={newFilter} filterFieldChange={filterFieldChange}/>

            <h2>Add a new</h2>
            
            <PersonForm newName={newName} newNumber={newNumber} 
            nameFieldChange={nameFieldChange} numberFieldChange={numberFieldChange} 
            addPerson={addPerson}/>

            <h2>Numbers:</h2>

            <Persons persons={persons} newFilter={newFilter}/>
            
        </div>
    )

}

export default Task2 