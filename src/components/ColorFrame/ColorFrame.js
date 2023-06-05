import { useEffect } from "react"

export default function ColorFrame({location}){

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

    return(
        <div className="frame-container">
            <h3>{'Colors for ' + location.name + ', ' + location.country}</h3>
            <div className="colors-container"> 
                {location.weatherInfo.map((code, idx)=>{

                    //Gets color for className
                    const weatherCondition = getWeatherCondition(code)
                    return(
                        <div key={idx} className={weatherCondition + ' color-div'} style={{width:`${1000/location.weatherInfo.length}px`}}>

                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}