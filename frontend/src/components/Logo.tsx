import React from 'react'
import { Link } from 'react-router-dom'

export const Logo = ({children}) => {
    return (
        <div>
            <div className="items-center relative backdrop-blur-md z-[668] min-w-full  sm:text-center container mx-auto pt-9 text-2xl font-bold flex">
                    <Link
                        to="../"
                        className="px-10 text-1xl mx-14 font-semibold leading-7 text-black-900"
                    >
                       Home
                    </Link>
            </div>
            <div>{children}</div>
        </div>
    )
}