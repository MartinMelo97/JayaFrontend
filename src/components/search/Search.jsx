import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../consts'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardMedia, Typography, Grid } from '@material-ui/core'
import map from '../../static/img/map.jpg'

const styles = theme =>({
    card: {
        minHeight: "30vh !important",
        display:"flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: "1.2em",
        margin: 0,
        color: "#fff",
        padding: "0 15px",
        textAlign:"center",
        width:"100%"
    },
    root: {
        flexGrow: 1,
        width: "80%",
        marginLeft: "5%",
        marginRight: "10%",
        padding: "2%",
        boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        marginBottom: "5%",
        marginTop: "5%",
        borderRadius: "5px",
        backgroundColor:"#fff"
    },
    media: {
        height: "100%",
        width:"100%",
        objectFit:"contain",
        transition: "0.5s ease-in-out",
        '&:hover': {
            opacity:"0.5"
        }
    },
    content: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to left, red, orange)",
        margin: 0,
        width: "100%",
    },
    link: {
        textDecoration: "none",
        
    },
    text: {
        width:"100%",
        textAlign:"center"
    }
})
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
        const { classes } = this.props
        return(
            <Grid container className={classes.root} spacing={32}>
            <Grid item xs={12}>
            <Typography variant="h4" className={classes.text}>
                Resultados de la búsqueda: {cityProps}
            </Typography>
            {this.state.isReady ?
                this.state.cities.map(city => {
                    const { id, place_name } = city
                    const longitude = city.geometry.coordinates[0]
                    const latitude = city.geometry.coordinates[1]
                    return(
                        <Grid item xs={12} md={4} key={id}>
                            <NavLink
                                    to={{
                                        pathname: `/${cityProps}/${latitude}/${longitude}`,
                                        state: {
                                            name: place_name
                                        }
                                    }}
                                    className={classes.link}
                                >
                            <Card className={classes.card}>
                                <CardMedia 
                                    component="img"
                                    className={classes.media+ " image"}
                                    image={map}
                                    title={place_name}
                                />
                                <CardContent className={classes.content}>
                                    <Typography className={classes.title} color="primary" gutterBottom>
                                        {place_name}
                                    </Typography>
                                </CardContent>
                            </Card>
                            </NavLink>
                        </Grid>
                    )
                }   
            ): <h2>Cargando...</h2>}
            </Grid>
            </Grid> 
        )
    }

}

export default withStyles(styles)(Search)
