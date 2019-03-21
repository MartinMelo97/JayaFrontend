import React, { Component } from 'react'
import { API_URL } from '../../consts'
import axios from 'axios'
import CurrentInfo from './CurrentInfo'
import Hourly from './Hourly'
import Daily from './Daily'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, Switch, FormControlLabel } from '@material-ui/core'

const styles = theme => ({
    container: {
        flexGrow: 1,
        width: "80%",
        minHeight:"80vh",
        borderRadius: "10px",
        backgroundColor:"#fff",    
        boxShadow: "4px 4px 4px rgba(0,0,0,0.3)",
        margin: "5% 0 5% 10%"
    },
    itemsFirst:{
        textAlign:"center"
    }
})

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
        let timeHours = new Date(time * 1000).getHours()
        let timeMinutes = new Date(time * 1000).getMinutes()
        if(timeMinutes.toString().length === 1) {
            timeMinutes = '0' + timeMinutes.toString()
        }

        if(timeHours.toString().length === 1) {
            timeHours = '0' + timeHours.toString()
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
        const { classes } = this.props
        return(
            <div className={classes.container}>
                <Grid container spacing={16}>
                    <Grid item xs={6} className={classes.itemsFirst}>
                        <FormControlLabel 
                            control = {
                                <Switch
                                    checked={this.state.scale === "F" ? false : true}
                                    onChange={this.changeScale}
                                    value=""
                                />
                            }
                            label="Temperatura en Celsius"
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.itemsFirst}>
                    <h2>Ciudad: {name}</h2>
                    </Grid>
                    <Grid item xs={12}></Grid>
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
                </Grid>

            </div>

        )
    }
}

export default withStyles(styles)(Detail)