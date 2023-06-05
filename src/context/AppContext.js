import { createContext, useState } from "react";

const AppContext = createContext()
const {Provider} = AppContext

const AppProvider = ({children}) => {
    
    //STATES
    const [isDark, setIsDark] = useState(false) 
    
    //FUNCTIONS
    const toggleDarkMode = () => {
        //Sets Dark mode to opposite as previous state
        setIsDark(!isDark)
    }

    const capitalizeWords = (string) =>{
        //Divides string into words, makes each words' first letter capital, joins the words into a string again and returns it
        return (
            string
                .toLowerCase()
                .split(' ')
                .map(word=> word.charAt(0).toUpperCase()+word.slice(1))
                .join(' ')
        )
    }

    return(
        <Provider value={{
            isDark,
            toggleDarkMode,
            capitalizeWords
        }}>
            {children}
        </Provider>
    )
}

export {AppContext, AppProvider}