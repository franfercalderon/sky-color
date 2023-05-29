import ColorFrame from "../ColorFrame/ColorFrame"
import SearchBar from "../SearchBar/SearchBar"
import { useState } from "react"

export default function ColorFrameContainer(){

    //STATE
    const [selectedLocation, setSelectedLocation] = useState(null) 

    //FUNCTIONS
    const selectLocation = (location) =>{

        //Stores selected location in state
        setSelectedLocation(location)
    }


    return(
        <div className="color-frame-main-container">

            <ColorFrame/>
            <SearchBar selectLocation={selectLocation}/>
        </div>
    )
}