import React from 'react'
import '../styles/loading.css'

const Loading = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center ">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loading