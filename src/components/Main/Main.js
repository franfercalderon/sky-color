import ColorFrameContainer from "../ColorFrameContainer/ColorFrameContainer"
import DarkThemeButton from "../DarkThemeButton/DarkThemeButton"

export default function Main() {
    return (
        <div className="main-container">
            <h2>Welcome</h2>
            <DarkThemeButton/>
            <ColorFrameContainer/>
        </div>
    )
}