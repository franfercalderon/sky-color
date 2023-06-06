import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {faTrashCan} from "@fortawesome/free-regular-svg-icons"
import { faRotateRight } from "@fortawesome/free-solid-svg-icons"

export default function ClearResults({clearAllResults}){
    return (
        <div className="clear-all-btn" onClick={clearAllResults}>
            <p>Clear results</p>
            <FontAwesomeIcon icon={faRotateRight}/>
        </div>
    )
}