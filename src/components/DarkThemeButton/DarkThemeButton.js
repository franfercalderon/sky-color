import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMoon, faSun} from "@fortawesome/free-regular-svg-icons"
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"

export default function DarkThemeButton(){

    const {isDark, toggleDarkMode} = useContext(AppContext)

    return(
        <>
            <FontAwesomeIcon icon={isDark ? faMoon : faSun} onClick={()=>toggleDarkMode()} className="dark-mode-btn"/>
        </>
    )
}