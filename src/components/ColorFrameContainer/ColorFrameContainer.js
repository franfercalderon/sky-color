import ColorFrame from "../ColorFrame/ColorFrame"
import SearchBar from "../SearchBar/SearchBar"
import { useEffect, useState } from "react"

export default function ColorFrameContainer(){

    //STATE
    const [selectedLocation, setSelectedLocation] = useState(null) 
    const [locationData, setLocationData] = useState([]) 

    //FUNCTIONS
    const selectLocation = (location) =>{

        //Stores selected location in state
        setSelectedLocation(location)
    }

    //EFFECTS
    useEffect(()=>{

        const formatLatAndLng = (value)=>{

            //Formats value to string including just the 2 first decimals of the lat/lng
            return(
                value
                .toString()
                .split('.')
                .map((numbers, idx) => {
                    if(idx === 0){
                        return numbers
                    }
                    else{
                        return numbers.slice(0,2)
                    }
                })
                .join('.')
            )
        }

        const getPeriodDates = () =>{

            //Date information: period will end 7 days before current date and start 365 days before that date.
            const currentDate = new Date()
            const endingDate = new Date(currentDate.setDate(currentDate.getDate() - 7))
                .toISOString()
                .slice(0, 10)
            const startDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1))
                .toISOString()
                .slice(0, 10)
            
            const dates = {
                endingDate,
                startDate
            }

            return dates
        }

        const getHistoricWeather = async () =>{

            //Gets information to call URL
            const lat = formatLatAndLng(selectedLocation.latitude)
            const lng = formatLatAndLng(selectedLocation.longitude)
            const endingDate = getPeriodDates().endingDate
            const startDate = getPeriodDates().startDate

            //Calls API url to get historic weather information
            const res = await fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lng}&start_date=${startDate}&end_date=${endingDate}&daily=weathercode&timezone=GMT`)
            const jsonRes = await res.json()
            const weatherInfo = jsonRes.daily.weathercode

            //Updates state including previous information, adding new location object to array.
            setLocationData([...locationData, { 
                    weatherInfo,
                    name: selectedLocation.name,
                    country: selectedLocation.country
                }
            ])
        }

        if (selectedLocation){
            
            getHistoricWeather()
        }

    },[selectedLocation])

    return(
        <div className="color-frame-main-container">
            {locationData.length > 0 &&
                locationData.map((location, idx)=>{
                    return(
                        <ColorFrame location={location} key={idx}/>
                        )
                        
                    })
                }
            <SearchBar selectLocation={selectLocation} locationData={locationData}/>
        </div>
    )
}