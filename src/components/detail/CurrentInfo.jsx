import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Chip } from '@material-ui/core'

const styles=theme=>({
    container: {
        flexGrow: 1,
        width: "100%",
        minHeight:"50vh",
        margin: 0,
        background: "linear-gradient(to right, black, gray)",
        color: "#fff",
        alignItems:"center"
    },
    childContainer: {
        textAlign:"center !important"
    },
    chips: {
        margin:"2vh 2vw"
    },
    icon: {
        width: "150px"
    }
})
const CurrentInfo = ({data, returnTime, scale, toCelsius, classes}) => {
    return(
            <Grid container spacing={16} className={classes.container}>
                
                <Grid item xs={12} md={6} className={classes.childContainer}>
                    <img src={`https://darksky.net/images/weather-icons/${data.icon}.png`} alt={data.icon} className={classes.icon}/>
                    <p>{data.summary}</p>
                    {scale === "F" ?
                    <div>
                    <p>{data.temperature} ºF</p>
                    <p>Aparente: {data.apparentTemperature} ºF</p>
                    </div>
                    : 
                    <div>
                        <p>{toCelsius(data.temperature)} ºC</p>
                        <p>Aparente: {toCelsius(data.apparentTemperature)} ºC</p>
                    </div>
                    }
                </Grid>
                <Grid item xs={12} md={6} className={classes.childContainer}>
                    <Chip className={classes.chips} label={`Probabilidad de lluvia: ${data.precipProbability * 100}%`} />
                    <Chip className={classes.chips} label={`Humedad: ${data.humidity * 100}%`} />
                    <Chip className={classes.chips} label={`Velocidad del viento: ${data.windSpeed} mph`} />
                    <Chip className={classes.chips} label={`Nubes: ${data.cloudCover*100}%`} />
                    <Chip className={classes.chips} label={`Visibilidad: +${data.visibility} mi`} />
                </Grid>
            </Grid>
            
    )
}

export default withStyles(styles)(CurrentInfo)