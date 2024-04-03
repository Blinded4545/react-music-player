import React, { useState } from 'react'
import ReactDOM, {createRoot} from 'react-dom/client'
import { ChangeBg } from './components/changeBgComponent'
import { CarouselComponent } from './components/carouselComponent'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));

document.getElementById("root").style.backgroundImage="url('https://github.com/Blinded4545/Wallpapers/blob/main/85.jpg?raw=true')"

root.render(

  <div className='flex' style={{height: "100%"}}>
    <div className='absolute'>
      <ChangeBg />
    </div>
    <div className="flex justify-center items-center" style={{height: "100%"}}>
      <CarouselComponent/>
    </div>
  </div>
  
)

