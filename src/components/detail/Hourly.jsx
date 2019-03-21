import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Card, CardMedia, CardContent, Typography } from '@material-ui/core'

const styles=theme=>({
    container: {
        flexGrow: 1,
        width: "100%",
        minHeight:"50vh",
        margin: 0,
        background: "linear-gradient(to left, #5f2c82, #49a09d)",
        color: "#fff",
        alignItems:"center"
    },
    childContainer: {
        textAlign:"center !important"
    },
    media: {
        height: "100%",
        width:"100%",
        objectFit:"contain",
        transition: "0.5s ease-in-out",
    },
    textCard: {
        fontSize: "1em",
        textAlign: "center"
    },
    textCardHour: {
        fontSize: "1.2em",
        textAlign: "center",
        fontWeight: 600
    },
    summaryHour: {
        color: "#fff",
        fontSize: "2em"
    }
})

const Hourly = ({hours, returnTime, scale, toCelsius, classes}) => {
    
    return(
    <Grid container spacing={32} className={classes.container}>
        <Grid item xs={12} className={classes.childContainer}>
            <Typography className={classes.summaryHour}>
                Durante el día: {hours.summary}
            </Typography>
        </Grid>
            {hours.data.map(hour=>(
                <Grid item xs={6} md={2} >
                <HourlyCard 
                    data={hour} 
                    returnTime={returnTime}
                    scale={scale}
                    toCelsius={toCelsius}
                    classes={classes}
                    />
                </Grid>
            ))}
        
    </Grid>
    )
} 

export default withStyles(styles)(Hourly)

const HourlyCard = ({data, returnTime, scale, toCelsius, classes}) => {
    return (
        <Card>
            <CardMedia 
                component="img"
                className={classes.media}
                image={`https://darksky.net/images/weather-icons/${data.icon}.png`}
                title={returnTime(data.time)}
            />

            <CardContent>
            <Typography gutterBottom className={classes.textCardHour}>
                {returnTime(data.time)}
            </Typography>
            <Typography gutterBottom className={classes.textCard}>
                {data.summary}
            </Typography> 
            {
                scale === "F" ?
                <Typography component="p" gutterBottom className={classes.textCard}>
                    {data.temperature} ºF
                </Typography>
                :
                <Typography component="p" gutterBottom className={classes.textCard}>
                    {toCelsius(data.temperature)} ºC
                </Typography>
            }
            
            </CardContent>

        </Card>
    )
}