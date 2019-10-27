import React from 'react'

const DisplayPersons = (props) => {
	return (
	  <div>
        {props.persons.filter(x => x.name.toLowerCase().includes(props.filter.toLowerCase()))
        .map(person => <p key={person.id}>{person.name} {person.number}
        <button onClick={() => props.deletePerson(person.id)}>remove</button></p> )}
	  </div>
	)
}

export default DisplayPersons