import { createContext, useContext, useEffect } from 'react'
import { useUserContext } from './UserContext'

const timelineData = {
    homeTimeline: {},
    profileTimeline: {},
    likeTimeline: {},
}

const SocketContext = createContext(timelineData)

export const useWebSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {

    const { user } = useUserContext()

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5000/')
        ws.onopen = () => {
            console.log("socket connection established")
            ws.send(JSON.stringify({ online: user._id }))
            // ws.send("online:" + user._id)
        }
        ws.onmessage = (e) => {
            // parse data to get title: depending on title notification or lpush tweet on context
            console.log(e.data)
        }

        ws.onclose = () => {
            console.log("browser is closed now")
            ws.close()
        }
    }, [])

    return (
        <SocketContext.Provider value={SocketContext}>
            {children}
        </SocketContext.Provider>
    )
}