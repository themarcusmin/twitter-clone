import React from 'react'

const Search = () => {
    return (
        <form className="w-full">
            <div className="group relative my-2 m-auto">
                <div className="absolute inset-y-0 left-1 flex items-center pl-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400 group-focus:text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    className="w-full h-10 pl-8 border-0 text-sm text-gray-400 focus:text-white placeholder-gray-600 bg-twitterLightBlue rounded-full shadow-md focus:bg-transparent"
                    type="text"
                    placeholder="Search Twitter" />
            </div>
        </form>
    )
}

export default Search