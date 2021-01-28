import React from 'react'
import '../styles/loading.css'

const Loading = () => {
    return (
        <div className="h-full w-full flex items-center justify-center ">
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