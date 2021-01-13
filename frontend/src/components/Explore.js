import React from 'react'
import Search from '../utils/Search'

const Explore = () => {
    return (
        <div className="overflow-y-auto scrollbar w-screen md:w-2/4">
            <div className="sticky top-0 bg-twitterBlue h-auto w-full border border-t-0 flex items-center px-4">
                <Search />
            </div>
            <div className="h-full border border-t-0">
            </div>
        </div>
    )
}

export default Explore