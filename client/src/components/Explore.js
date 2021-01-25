import React, { Fragment } from 'react'
import Search from '../utils/Search'

const Explore = () => {
    return (
        <Fragment>
            <div className="sticky-header h-auto default-tweet-border">
                <Search />
            </div>
            <div className="h-full default-tweet-border">
            </div>
        </Fragment>
    )
}

export default Explore