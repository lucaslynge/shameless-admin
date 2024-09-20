import React from 'react'

export default function TexTruncate({text}) {
  return (
    <div className="relative w-16">
    {/* Adjust the width as needed */}
    <h2 className="truncate hover:whitespace-normal hover:overflow-visible hover:bg-gray-100 hover:p-2 hover:absolute hover:z-10">
      {text}
    </h2>
  </div>  )
}
