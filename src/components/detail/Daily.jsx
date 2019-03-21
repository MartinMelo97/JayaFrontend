import React from 'react'

export const Daily = ({days, returnDay, scale, toCelsius}) => (
    <div>
        <h2>Días</h2>
        <p>Pronóstico para las próximas días:</p>
        <p>{days.summary}</p>

        {days.data.map(day=>(
            <DayCard 
                data={day} 
                returnDay={returnDay}
                scale={scale}
                toCelsius={toCelsius}
                />
        ))}
    </div>
)

const DayCard = ({data, returnDay, scale, toCelsius}) => (
    <div>
        <div>
            <h3>Para el: {returnDay(data.time)}</h3>
            <p>Estado: {data.summary}</p>
            {
                scale === "F" 
                ?
                <p>Temperatura (ºF): {data.temperature}</p>
                :
                <p>Temperatura (ºC): {toCelsius(data.temperature)}</p>
            }
            
        </div>
    </div>
)