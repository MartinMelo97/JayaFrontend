import React from 'react'
import './homepage.scss'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {Button, Input} from '@material-ui/core'

const styles = theme => ({
    input: {
        height: "5vh !important",
        marginLeft: theme.spacing.unit,
        textAlign:"center !imporrtant"
    },
    button: {
        color: "#fff",
        width: "25vw",
        fontSize: "1.5em",
        borderColor: "#fff"
    },
    navlink: {
        textDecoration: "none"
    },
    logo: {
        maxWidth: "100vw"
    }
})

const HomePage = (props) => {
    const { classes } = props
    return(
    <div className="homepage-container">
    <div>
    <img src="https://www.jayacompany.com/wp-content/uploads/2019/03/jayacompany.png" alt="jaya" className={classes.logo}/>
    <Input
        value={props.inputCity}
        onChange={(e)=>props.updateCity(e)}
        variant="outlined"
        label="¿De qué ciudad deseas conocer su clima?"
        placeholder="¿De qué ciudad deseas conocer su clima?"
        className={classes.input+" input"}
        inputProps={{
            'aria-label': 'Description',
        }}
    />
    <NavLink to={`/search/${props.inputCity}`} className={classes.navlink+ " link"}>
        <Button
            variant="outlined"
            className={classes.button+ " button"}
        >Search</Button>
    </NavLink>
    </div>
    </div>
    )
}

export default withStyles(styles)(HomePage)