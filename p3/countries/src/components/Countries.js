import React from 'react'

const Countries = ({countries, newFilter}) => {
    
    const n = newFilter.toLowerCase()
    const s = countries.filter((country)=> country.name.toLowerCase().startsWith(n))
    console.log(s.length)
    if (s.length > 10) {
        return (
            <div>Too many matches specify another filter</div>
        )
    }
    else if (s.length <= 10 && s.length > 1) {
        return(
           <div>{s.map((country, i) => <div>{country.name}</div>)}</div> 
        )
        
    }
    else if (s.length == 1) {
       return (
           <div>
               <h1>{s[0].name}</h1>
               <p>capital {s[0].capital} </p>
               <p>population {s[0].population}</p>
               <h3>languages</h3>
               <ul>
                   {s[0].languages.map((language, i) => <li>{language.name}</li>)}
               </ul>
               <img src = {s[0].flag} width = {250} height = {250}></img>
           </div>
       )
    }
    return (
        <div></div>
    )
}

export default Countries