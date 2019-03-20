import React from 'react'
import { NavLink } from 'react-router-dom'
const HomePage = (props) => (
    <div>
    <h2>HomePage</h2>
    <input 
        type="text"
        value={props.inputCity}
        onChange={(e)=>props.updateCity(e)}
        placeholder="Ciudad"
    />
    <NavLink to={`/search/${props.inputCity}`}>
        <button>Search</button>
    </NavLink>
    </div>
)

export default HomePage