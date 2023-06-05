import { useContext } from "react"
import { AppContext } from "../../context/AppContext"

export default function AddButton({toggleShowInput}){

    //CONTEXT
    const {isDark} = useContext(AppContext)

    return (
        <div className={`add-btn ${isDark ? 'dark' : ''}`} onClick={()=>{toggleShowInput()}}>
            <span>+</span>
        </div>
    )
}