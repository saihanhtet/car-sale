import React from 'react'

const StatusCard = ({ title, content }) => {
    return (
        <div className="bg-white w-full shadow-lg rounded-lg p-6 max-w-sm">
            <div className="pb-4">
                <h2 className="text-xl font-semibold capitalize text-gray-900">{title}</h2>
            </div>
            <div className="text-xl text-gray-600 text-right capitalize font-mono font-black">
                {content}
            </div>
        </div>

    )
}

export default StatusCard
