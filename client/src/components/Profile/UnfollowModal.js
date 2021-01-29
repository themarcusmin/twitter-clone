import React, { useState, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

/** Credit: https://gist.github.com/viclafouch/6ee36b2cb7d28484d20f05e68b3433f9
 * 3 ways to close the modal
 * - pressing esc key
 * - click outside of the modal
 * - clicking on close icon
 */

const modalElement = document.getElementById('modal-root')

function UnfollowModal({ username, defaultOpened = false }, ref) {
    const [isOpen, setIsOpen] = useState(defaultOpened)
    console.log("username: ", username)
    const handleEscape = useCallback(
        event => {
            if (event.keyCode === 27) return setIsOpen(false)
        }, []
    )

    const close = useCallback(() => setIsOpen(false), [])

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close
    }), [close])

    useEffect(() => {
        if (isOpen) document.addEventListener('keydown', handleEscape, false)
        return () => document.removeEventListener('keydown', handleEscape, false)
    }, [handleEscape, isOpen])

    const handleClickOutside = () => {
        setIsOpen(false)
    }

    return createPortal(
        isOpen ? (
            <div className="fixed z-20 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* BG overlay */}
                    <div onClick={handleClickOutside} className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    {/* toggle modal panel: inline-block / hidden */}
                    <div className="inline-block align-bottom bg-twitterBlue rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="bg-twitterBlue px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-center">
                                <div className="mt-3 text-center sm:mt-0 sm:text-center">
                                    <h3 className="text-lg leading-6 font-bold text-white" id="modal-headline">
                                        {`Unfollow @${username}?`}
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Their Tweets will no longer show up in your home timeline.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 pb-5 md:justify-center sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" className="w-full inline-flex justify-center rounded-full shadow-sm px-4 py-2 bg-twitterBtn text-base font-medium text-white hover:bg-twitterBtnHover focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                                Unfollow
                            </button>
                            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-full shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) : null,
        modalElement
    )
}

export default forwardRef(UnfollowModal)