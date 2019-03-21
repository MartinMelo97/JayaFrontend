import React from 'react'

const CurrentInfo = ({data, returnTime, scale, toCelsius}) => {
    return(
        <div>
            <h3>En este momento</h3>
            <p>{returnTime(data.time)}</p>
            <p>{data.summary}</p>
            {
                scale === "F" ?
                <p>Temperatura (ºF): {data.temperature}</p>
                : 
                <p>temperatura (ºC): {toCelsius(data.temperature)}</p>
            }
            
        </div>
    )
}

export default CurrentInfo