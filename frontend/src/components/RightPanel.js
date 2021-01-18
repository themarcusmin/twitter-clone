import React from 'react'
import { useLocation } from 'react-router-dom'
import Search from '../utils/Search'

const RightPanel = () => {
    const location = useLocation()
    return (
        <div className="hidden sm:block sm:w-1/6 md:w-1/4 px-4">
            {location.pathname !== "/explore" && (
                <Search />
            )}
            <div className="select-none text-gray-400 my-3 flex flex-wrap text-xs items-center justify-center space-x-3">
                <span>Terms of Service</span>
                <span>Privacy Policy</span>
                <span>Cookie Policy</span>
                <span>Ads Info</span>
                <span>More...</span>
                <span>© 2021 Twitter, Inc.</span>
            </div>
        </div>
    )
}

export default RightPanel;