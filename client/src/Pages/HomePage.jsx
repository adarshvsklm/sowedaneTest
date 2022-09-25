import React from 'react'
import Home from '../Components/Home/Home'
import Sidebar from '../Components/Sidebar/Sidebar'

function HomePage() {
  return (
    <div>
      <Sidebar>
         <Home />
      </Sidebar>
     </div>
  )
}

export default HomePage
