import { createContext, useContext } from 'react'
import useFindUser from './useFindUser'

const UserContext = createContext(null)

export const useUserContext = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
    const { user, setUser } = useFindUser()

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}