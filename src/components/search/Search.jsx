import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../consts'

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isReady: false,
            cities: null
        }
    }

    componentDidMount = async() => {
        let {city} = this.props.match.params
        let cityPromise = await axios.get(`${API_URL}/${city}`)
        let [cities] = await Promise.all([cityPromise])

        if(typeof(cities.data) !== "string")
        {
            await this.setState({
                    cities: cities.data.features,
                    isReady: true
                })
        }
        else
        {
            await alert(cities.data)
        }

    }

    render() {
        const cityProps = this.props.match.params.city
        return(
            <div>
            <h1>Resultados de la búsqueda: {cityProps}</h1>
            {this.state.isReady ?
                this.state.cities.map(city => {
                    const { id, place_name } = city
                    const longitude = city.geometry.coordinates[0]
                    const latitude = city.geometry.coordinates[1]
                    return(
                        <div key={id}>
                            <NavLink
                                to={`/${cityProps}/${latitude}/${longitude}`}
                            >
                                <p>{place_name}</p>
                            </NavLink>
                        </div>
                    )
                }    
            ): <h2>Cargando...</h2>}
            </div>
        )
    }

}

export default Search
