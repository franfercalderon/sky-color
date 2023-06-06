import { useEffect, useState, useContext, useRef } from "react"
import { AppContext } from "../../context/AppContext"
import AddButton from "../AddButton/AddButton"

export default function SearchBar({selectLocation, locationData}){

    //STATES
    const [locationResults, setLocationResults] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [showInput, setShowInput] = useState(false) 

    //REFS
    const bottomRef = useRef(null)

    //CONTEXT
    const {capitalizeWords, isDark} = useContext(AppContext)

    //VARIABLES
    const geoLocateBaseUrl = `https://geocoding-api.open-meteo.com/v1/search?count=3&name=`

    //FUNCTIONS
    const handleSelect = (location) => {
        //Sets location using parent component function
        selectLocation(location)

        //Clears input value
        setInputValue('')

        //Hides searchBar
        setShowInput(false)
    }   

    const toggleShowInput = () =>{
        //Toggles state for show input
        setShowInput(!showInput)
    }

    const scrollToBottom = () =>{
        bottomRef.current?.scrollIntoView({behavior: 'smooth'})
    }


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
        else if (inputValue.length === 0){
            setLocationResults(null)
        }

    },[inputValue, geoLocateBaseUrl])

    useEffect(()=>{
        //Keeps the latter result on screen
        scrollToBottom()
        
    },[locationResults, locationData])


    useEffect(()=>{
        //If there's no information in locationData, shows input instead of add button
        if(locationData.length === 0){
            setShowInput(true)
        }
    },[locationData])

    return(
        <div className="searchbar-container">
            {showInput ? 
            <input type="text" autoFocus placeholder={locationData.length === 0 ? 'Search location' : 'Add new location'} onChange={(e)=>setInputValue(capitalizeWords(e.target.value))} value={inputValue} className={`search-input ${locationResults ? 'extended' : ''} ${isDark ? 'dark' : ''}`} />
            :
            <AddButton toggleShowInput={toggleShowInput}/>
            }
            {locationResults &&
            <div className={`search-results-container ${isDark ? 'dark' : ''}`} >
                <ul>
                    {locationResults.map((location, idx)=>{
                        const trimmedCity = location.name.slice(inputValue.length)
                        return(
                            <li key={idx} tabIndex={idx} onClick={()=>handleSelect(location)} className="location-results-li"> 
                                <span>{capitalizeWords(inputValue)}</span>
                                {trimmedCity + ', '+location.country}
                            </li>
                        )
                    })}
                </ul>
            </div>
            }
            <span ref={bottomRef}></span>

        </div>
    )
}