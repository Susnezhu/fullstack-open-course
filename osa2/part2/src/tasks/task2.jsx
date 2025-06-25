import {useState} from 'react'

const Task2 = () => {

    const allPersons = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]

    const [persons, setPersons] = useState(allPersons)

    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [newFilter ,setNewFilter] = useState("")

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

            <div>filter shown with <input value={newFilter} onChange={filterFieldChange}/></div>

            <h2>Add a new</h2>
            <form>
                <div>name: <input value={newName} onChange={nameFieldChange}/></div>
                <div>number: <input value={newNumber} onChange={numberFieldChange}/></div>

                <div>
                    <button onClick={addPerson} type="submit">add</button>
                </div>
            </form>


            <h2>Numbers:</h2>

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
        </div>
    )
}

export default Task2 