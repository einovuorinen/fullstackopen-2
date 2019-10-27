import React from 'react'

const AddPerson = (props) => {
  return(
    <form onSubmit={props.addPerson}>
        <div>
          name: <input 
            value={props.newName}
            onChange={props.handleChange}
          />
        </div>
        <div>
          number: <input 
            value={props.newNumber}
            onChange={props.handleChange2}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
export default AddPerson