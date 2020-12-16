import React from 'react'
import Contact from './Contact'
const Numbers  = ({persons, newFilter, handler}) => {
  
    return (
    <div> 
      {persons.filter((person) => person.name.toLowerCase().startsWith(newFilter.toLowerCase())).map((person, i) => <Contact key = {i} person={person} name={person.name} number={person.number} handler={handler} />)}
    </div>
    )
}

export default Numbers