import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMoon, faSun} from "@fortawesome/free-regular-svg-icons"
import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext"

export default function DarkThemeButton(){
    //STATES
    const [showTag, setShowTag] = useState(false)

    //CONTEXT
    const {isDark, toggleDarkMode} = useContext(AppContext)

    return(
        <div className={`dark-mode-btn ${isDark ? 'dark' : ''}`}>
            {showTag &&
                <div className={`dark-mode-tag ${isDark ? 'dark' : ''}`}>
                    <p>{`Turn Dark Mode ${isDark ? 'off' : 'on'}`}</p>
                </div>
            }
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} onClick={()=>toggleDarkMode()} onMouseEnter={()=>setShowTag(true)} onMouseLeave={()=>setShowTag(false)}/>
        </div>
        
    )
}