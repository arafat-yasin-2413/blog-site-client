import React from 'react'

export default function contactLayout({ children } : { children : React.ReactNode}) {
  return (
    <div>
        <h1>This is Contact Layout</h1>
        {children}
    </div>
  )
}
