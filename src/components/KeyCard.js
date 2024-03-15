import React from 'react'

const KeyCard = ({ num, text }) => {
  return (
    <div className="w-[300px] rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
            <div className=" text-gray-700 text-4xl text-center">{num}</div>
            <p className="font-medium text-xl mb-2 text-center">
              {text}
            </p>
        </div>
    </div>
  )
}

export default KeyCard
