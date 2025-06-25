import {useState} from 'react'

const Task2 = () => {

    const allPersons = [
        {name: "Arto Hellas"}
    ]

    const [persons, setPersons] = useState(allPersons)

    const [newName, setNewName] = useState("")

    const fieldChange = (event) => {
        setNewName(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        console.log(newName)
        
        const personObject = {
            name: newName
        }

        setPersons(persons.concat(personObject))
        setNewName("")
    }

    return (
        <div>
            <h1>Phonebook</h1>

            <form>
                <div>
                    name: <input value={newName} onChange={fieldChange}/>
                </div>
                <div>
                    <button onClick={addPerson} type="submit">add</button>
                </div>
            </form>

            <h2>Numbers:</h2>

            <ul>
                {persons.map(num =>
                    <li key={num.name}>
                        {num.name}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Task2 