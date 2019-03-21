import React, { Component } from 'react'
import { API_URL } from '../../consts'
import axios from 'axios'

import CurrentInfo from './CurrentInfo'
import { Hourly } from './Hourly'
import { Daily } from './Daily'

class Detail extends Component {

    constructor(props){
        super(props)
        this.state = {
            isReady: false,
            info:null,
            scale: 'F'
        }
    }

    componentDidMount = async() => {
        const { lat, long }= this.props.match.params
        let infoPromise = await axios.get(`${API_URL}/${lat}/${long}`)
        let [info] = await Promise.all([infoPromise])

        if(typeof(info.data) !== "string")
        {
           await this.setState({info: info.data, isReady: true})
        }
        else
        {
            await alert(info.data)
        }
    }

    returnDay = (time) => {
        let date = new Date(time*1000)
        let day_str = date.getDay()
        let day = date.getDate()
        switch(day_str)
        {
            case 0: 
                day_str="Domingo" 
                break
            case 1: 
                day_str="Lunes" 
                break
            case 2: 
                day_str="Martes" 
                break
            case 3: 
                day_str="Miércoles" 
                break
            case 4: 
                day_str="Jueves" 
                break
            case 5: 
                day_str="Viernes" 
                break
            case 6: 
                day_str="Sábado" 
                break
            default:
                day_str="WHAT"
                break
        }
        return `${day_str} ${day}`
    }


    returnTime = (time) => {
        const timeHours = new Date(time * 1000).getHours()
        let timeMinutes = new Date(time * 1000).getMinutes()
        if(timeMinutes === 0) {
            timeMinutes = '00'
        }
        const timeFormatted = `${timeHours}:${timeMinutes}`
        return timeFormatted
    }

    toCelsius = (fahrenheit) => {
        let celsius = (fahrenheit - 32)/1.8
        return celsius.toFixed(2)
    }

    changeScale = () => {
        console.log("llego")
        let {scale} = this.state
        if(scale==="F"){
            this.setState({scale: "C"})
        }
        else{
            this.setState({scale: "F"})
        }
    }

    render(){
        let { name } = this.props.location.state
        return(
            <div>
                {this.state.scale === "F" ?
                <button onClick={this.changeScale}>Cambiar a Celsius</button>
                :
                <button onClick={this.changeScale}>Canbiar a Fahrenheit</button>
                }
                <h2>Ciudad: {name}</h2>
                { this.state.isReady ?
                    <div>
                    <CurrentInfo 
                        data={this.state.info.currently}
                        returnTime={this.returnTime}
                        scale={this.state.scale}
                        toCelsius={this.toCelsius}
                        />
                    <Hourly 
                        hours={this.state.info.hourly} 
                        returnTime={this.returnTime}
                        scale={this.state.scale}
                        toCelsius={this.toCelsius}
                        />
                    <Daily 
                        days={this.state.info.daily} 
                        returnDay={this.returnDay}
                        scale={this.state.scale}
                        toCelsius={this.toCelsius}
                    />
                    </div>
                : <p>Trayendo datos</p>}

            </div>

        )
    }
}

export default Detail