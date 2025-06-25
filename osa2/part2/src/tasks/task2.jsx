import {useState} from 'react'

const Task2 = () => {

    const allPersons = [
        {name: "Arto Hellas",
        number: "040-12345678"
        }
    ]

    const [persons, setPersons] = useState(allPersons)

    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")

    const nameFieldChange = (event) => {
        setNewName(event.target.value)
    }
    const numberFieldChange = (event) => {
        setNewNumber(event.target.value)
    }

    const nameExists = persons.some(person => person.name === newName)

    const addPerson = (event) => {
        event.preventDefault()
        
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

            <form>
                <div>name: <input value={newName} onChange={nameFieldChange}/></div>
                <div>number: <input value={newNumber} onChange={numberFieldChange}/></div>

                <div>
                    <button onClick={addPerson} type="submit">add</button>
                </div>
            </form>


            <h2>Numbers:</h2>

            <ul>
                {persons.map(num =>
                    <li key={num.name}>
                        {num.name}: {num.number}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Task2 