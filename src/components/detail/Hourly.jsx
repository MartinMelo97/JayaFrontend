import React from 'react'

export const Hourly = ({hours, returnTime, scale, toCelsius}) => (
    <div>
        <h2>Horas</h2>
        <p>Pronóstico para las próximas horas:</p>
        <p>{hours.summary}</p>

        {hours.data.map(hour=>(
            <HourlyCard 
                data={hour} 
                returnTime={returnTime}
                scale={scale}
                toCelsius={toCelsius}
                />
        ))}
    </div>
)

const HourlyCard = ({data, returnTime, scale, toCelsius}) => {
    return (
        <div>
            <h3>Para las: {returnTime(data.time)}</h3>
            <p>Estado: {data.summary}</p>
            {
                scale === "F" 
                ?
                <p>Temperatura (ºF): {data.temperature}</p>
                :
                <p>Temperatura (ºC): {toCelsius(data.temperature)}</p>
            }
            
        </div>
    )
}