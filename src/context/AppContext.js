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

    return(
        <Provider value={{
            isDark,
            toggleDarkMode
        }}>
            {children}
        </Provider>
    )
}

export {AppContext, AppProvider}