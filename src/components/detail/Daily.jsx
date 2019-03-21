import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, CardMedia, Typography } from '@material-ui/core'

const styles=theme=>({
    container: {
        flexGrow: 1,
        width: "100%",
        minHeight:"50vh",
        margin: 0,
        background: "linear-gradient(to left, red, orange)",
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
    },
    dayCardContainer: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center !important",
        textAlign: "center"
    }
})

const Daily = ({days, returnDay, scale, toCelsius, classes}) => (

    <Grid container spacing={32} className={classes.container}>
        <Grid item xs={12} className={classes.childContainer}>
            <Typography className={classes.summaryHour}>
                Próximos días: {days.summary}
            </Typography>
        </Grid>
            {days.data.map(day=>(
                <Grid item md={3} xs={6} className={classes.dayCardContainer}>
                <DayCard 
                    data={day} 
                    returnDay={returnDay}
                    scale={scale}
                    toCelsius={toCelsius}
                    classes={classes}
                    />
                </Grid>
            ))}
        
    </Grid>
)

export default withStyles(styles)(Daily)

const DayCard = ({data, returnDay, scale, toCelsius, classes}) => (
    <Card>
            <CardMedia 
                component="img"
                className={classes.media}
                image={`https://darksky.net/images/weather-icons/${data.icon}.png`}
                title={returnDay(data.time)}
            />

            <CardContent>
            <Typography gutterBottom className={classes.textCardHour}>
                {returnDay(data.time)}
            </Typography>
            <Typography gutterBottom className={classes.textCard}>
                {data.summary}
            </Typography> 
            {
                scale === "F" ?
                <div>
                    <Typography component="p" gutterBottom className={classes.textCard}>
                        Máxima {data.temperatureHigh} ºF
                    </Typography>
                    <Typography component="p" gutterBottom className={classes.textCard}>
                        Mínima {data.temperatureLow} ºF
                    </Typography>
                </div>
                :
                <div>
                    <Typography component="p" gutterBottom className={classes.textCard}>
                        Máxima {toCelsius(data.temperatureHigh)} ºC
                    </Typography>
                    <Typography component="p" gutterBottom className={classes.textCard}>
                        Mínima {toCelsius(data.temperatureLow)} ºC
                    </Typography>
                </div>
            }
            
            </CardContent>

        </Card>
)