import { AppContext } from "../../context/AppContext"
import ColorFrameContainer from "../ColorFrameContainer/ColorFrameContainer"
import DarkThemeButton from "../DarkThemeButton/DarkThemeButton"
import { useContext } from "react"

export default function Main() {

    const {isDark} = useContext(AppContext)
    
    return (
        <div className={`main-container ${isDark ? 'dark' : ''}`}>
            <DarkThemeButton/>
            <h2>Welcome to Sky Color</h2>
            <p>Search for a location.</p>
            <p>Get its last year <span className="title-color">sky colors</span>.</p>
            <ColorFrameContainer isDark={isDark}/>
        </div>
    )
}