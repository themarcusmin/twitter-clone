import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

const NoMatch = () => {
    const history = useHistory()
    return (
        <Fragment>
            <div className="h-full pt-10 flex flex-col items-center justify-start space-y-8">
                <div className="font-bold text-xl">Sorry, that page doesn't exist!</div>
                <div className="text-sm">
                    Why not try a
                    <span onClick={() => history.push("/explore")} className="mx-1 text-twitterTextBlue hover:underline cursor-pointer">
                        search
                    </span>
                    for something else?
                </div>
            </div>
        </Fragment>
    )
}

export default NoMatch