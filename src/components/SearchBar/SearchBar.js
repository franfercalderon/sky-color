import { useEffect, useState } from "react"

export default function SearchBar({selectLocation}){

    //STATES
    const [locationResults, setLocationResults] = useState(null)
    const [inputValue, setInputValue] = useState('')
    


    //VARIABLES
    const geoLocateBaseUrl = `https://geocoding-api.open-meteo.com/v1/search?count=3&name=`

    //FUNCTIONS
    
    //EFFECTS 
    useEffect(()=>{

        //Whenever inputValue changes, triggers this function if length > 2 characters
        const getGeolocalization = async (value) =>{
            
            //Calls API using base url + input value to search locations
            const res = await fetch(geoLocateBaseUrl+value)
            const jsonRes = await res.json()
    
            //Stores location in local state
            setLocationResults(jsonRes.results)
        }

        if (inputValue.length > 2){
            getGeolocalization(inputValue)
        }
        else if (inputValue.length == 0){
            setLocationResults(null)
        }

    },[inputValue, geoLocateBaseUrl])

    
    return(
        <div className="searchbar-container">
            <input type="text" placeholder="Search Location" onChange={(e)=>setInputValue(e.target.value)}/>
            <div className="search-results-container">
                <ul>
                    {locationResults &&
                    locationResults.map((location, idx)=>{
                        return(
                            <li key={idx} onClick={()=>selectLocation(location)}>{location.name + ', '+location.country}</li>
                        )
                    })
                    }
                </ul>
            </div>

        </div>
    )
}