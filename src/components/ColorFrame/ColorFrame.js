import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faTrashCan} from "@fortawesome/free-regular-svg-icons"

export default function ColorFrame({location, deleteLocation}){
    //STATES
    const [dates, setDates] = useState(null)
    const [showOptions, setShowOptions] = useState(false)

    //FUNCTIONS
    //Assigns a color depending on the weather code:
    const getWeatherCondition = (code) =>{
        if (code === 0) {
            return 'sunny'
        }
        else if (code > 0 && code < 4) {
            return 'cloudy'
        }
        else if ((code > 3 && code < 11) || (code > 29 && code < 36)){
            return 'dusty'
        }
        else if ((code > 10 && code < 22) || (code > 49 && code < 70) || (code > 79)){
            return 'stormy'
        }
        else if ((code > 39 && code < 50)){
            return 'foggy'
        }
        else if((code > 21 && code < 30) || (code > 35 && code < 40) || (code > 69 && code < 80)){
            return 'snowy'
        }
    }

    //EFFECTS
    useEffect(()=>{
        //Creates date object with current date, this will be used to show date information with the graphic
        const currentDate = new Date()
        const month = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()
        const year = currentDate.getFullYear()
        setDates({month, year})
    },[])

    return(
        <>
        <div className="frame-container" onMouseLeave={()=>setShowOptions(false)}>

            <div className="colors-container">
                {location.weatherInfo.map((code, idx)=>{
                    //Gets color for className
                    const weatherCondition = getWeatherCondition(code)
                    return(
                        <div key={idx} className={weatherCondition + ' color-div'}>
                        </div>
                    )
                })
                }
            </div>
            <div className="data-container">
                <div className="date-container left">
                    <h4>{dates && dates.month}</h4>
                    <h4>{dates && dates.year-1}</h4>
                </div>
                <div className={`location-title-container`} onMouseEnter={()=>setShowOptions(true)} onMouseLeave={()=>setShowOptions(false)}>
                    <div className={`adjustable-container ${showOptions ? 'trash': ''}`}  onClick={()=>deleteLocation(location.id)}>
                        {showOptions ?
                        <FontAwesomeIcon icon={faTrashCan} />
                        :
                        <h3>{location.name + ', ' + location.country}</h3>
                        }
                    </div>
                </div>
                <div className="date-container right">
                    <h4>{dates && dates.month}</h4>
                    <h4>{dates && dates.year-1}</h4>
                </div>

            </div>
        </div>
        </>
    )
}