import React, { useState, Fragment } from 'react'
import userLogo from '../styles/user.svg'
import Feed from './Feed'
import { v4 as uuid4 } from 'uuid'

/**
 * Control:
 *  - Each Tweet has a limit of 280 characters
 */

const MakeTweet = () => {
    const tweetCharLimit = 280
    const [tweet, setTweet] = useState("")
    const [newsfeed, setNewsFeed] = useState([])
    const handleTweet = (e) => {
        e.preventDefault()
        setNewsFeed([...newsfeed, { name: 'me', username: 'meTweeting', createdAt: 'now', content: tweet }])
        setTweet("")
    }

    return (
        <Fragment>
            <div className="sticky-header default-tweet-border">
                <div className="font-bold">Home</div>
            </div>
            <div className="h-auto w-full border border-t-0 border-gray-600 flex flex-row space-x-4 p-4">
                <img className="w-8 h-8" src={userLogo} alt="" />
                <div className="w-full space-y-4">
                    <form onSubmit={handleTweet} className="focus:ring-0 focus:outline-none">
                        <textarea onChange={(e) => setTweet(e.target.value)} value={tweet} className="h-auto bg-transparent w-full border-0 border-b border-white focus:border-white focus:ring-0 focus:outline-none" type="text" placeholder="What's happening?" />
                        <div className="w-full flex justify-end space-x-3">
                            {tweet.length > tweetCharLimit && (
                                <div className="select-none text-red-500 rounded-full w-7 h-7 border-2 border-red-500 text-center mt-4">{tweet.length - tweetCharLimit}</div>
                            )}
                            <button disabled={!tweet || !(/\S/.test(tweet)) || (tweet.length > tweetCharLimit)} className="disabled:opacity-50 mt-4 px-2 py-1 rounded-full w-16 bg-blue-500 focus:outline-none" type="submit">Tweet</button>
                        </div>
                    </form>
                </div>
            </div>
            <Feed data={{ name: "ru", username: "popasf", createdAt: "now", content: "asf" }} />
            <Feed data={{ name: "ru", username: "popasf", createdAt: "now", content: "asf" }} />
            <Feed data={{ name: "ru", username: "popasf", createdAt: "now", content: "asf" }} />
            <Feed data={{ name: "ru", username: "popasf", createdAt: "now", content: "asf" }} />
            <Feed data={{ name: "ru", username: "popasf", createdAt: "now", content: "asf" }} />
            <Feed data={{ name: "ru", username: "popasf", createdAt: "now", content: "asf" }} />
            <Feed data={{ name: "ru", username: "popasf", createdAt: "now", content: "asf" }} />
            <Feed data={{ name: "ru", username: "popasf", createdAt: "now", content: "asf" }} />
            {
                newsfeed.length ? newsfeed.map(data => {
                    return <Feed key={uuid4()} data={data} />
                }) : null
            }
        </Fragment>
    )
}

export default MakeTweet;