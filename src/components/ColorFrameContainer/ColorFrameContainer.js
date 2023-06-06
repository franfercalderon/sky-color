import ColorFrame from "../ColorFrame/ColorFrame"
import Loader from "../Loader/Loader"
import SearchBar from "../SearchBar/SearchBar"
import { useEffect, useState} from "react"
import ClearResults from "../ClearResults/ClearResults"

export default function ColorFrameContainer({isDark}){

    //STATE
    const [selectedLocation, setSelectedLocation] = useState(null) 
    const [locationData, setLocationData] = useState([]) 
    const [isLoading, setIsLoading] = useState(false)

    //FUNCTIONS
    const selectLocation = (location) =>{
        //Stores selected location in state
        setSelectedLocation(location)
    }

    const deleteLocation = (id) =>{
        const updatedLocations = locationData.filter(element=>element.id !== id)
        setLocationData(updatedLocations)
    }

    const clearAllResults = ()=>{
        //Clears all locations data
        setLocationData([])
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
            //Shows Loader
            setIsLoading(true)
            //Gets information to call URL
            const lat = formatLatAndLng(selectedLocation.latitude)
            const lng = formatLatAndLng(selectedLocation.longitude)
            const endingDate = getPeriodDates().endingDate
            const startDate = getPeriodDates().startDate

            //Calls API url to get historic weather information
            const res = await fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lng}&start_date=${startDate}&end_date=${endingDate}&daily=weathercode&timezone=GMT`)
            const jsonRes = await res.json()
            const weatherInfo = jsonRes.daily.weathercode

            //Creates ID for this element
            const id = locationData.length + 1

            //Updates state including previous information, adding new location object to array.
            setLocationData([...locationData, { 
                    id,
                    weatherInfo,
                    name: selectedLocation.name,
                    country: selectedLocation.country
                }
            ])
            setIsLoading(false)
        }

        if (selectedLocation){
            
            getHistoricWeather()
        }

    },[selectedLocation])

    return(
        <div className={`color-frame-main-container ${isDark ? 'dark' : ''}`}>
            {locationData.length > 0 &&
                <ClearResults clearAllResults={clearAllResults}/>
            }
            {locationData.length > 0 &&
                locationData.map((location, idx)=>{
                    return(
                        <ColorFrame location={location} deleteLocation={deleteLocation} key={idx}/>
                    )
                        
                })
            }
            {isLoading ?
            <Loader/>
            :
            <SearchBar selectLocation={selectLocation} locationData={locationData} />
            }
        </div>
    )
}