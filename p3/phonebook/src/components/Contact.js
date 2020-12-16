import React from 'react'

const Contact = (props) => {
    return (
        <div>{props.name} {props.number} <button onClick = {() => props.handler(props.person)}>delete</button> </div>
    )
}

export default Contact