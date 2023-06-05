import { AppContext } from "../../context/AppContext"
import ColorFrameContainer from "../ColorFrameContainer/ColorFrameContainer"
import DarkThemeButton from "../DarkThemeButton/DarkThemeButton"
import { useContext } from "react"

export default function Main() {

    const {isDark} = useContext(AppContext)

    console.log(isDark)

    
    return (
        <div className={`main-container ${isDark ? 'dark' : ''}`}>
            <DarkThemeButton/>
            <h2>Welcome to Sky Color</h2>
            <p>Search for a location to see the last year weather color at a glance.</p>
            <ColorFrameContainer/>
        </div>
    )
}