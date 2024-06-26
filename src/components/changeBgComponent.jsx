import { useState, useRef } from "react"
import Icon from '@mdi/react'
import { mdiCog } from '@mdi/js'


export function ChangeBg(){

    const [display, setDisplay] = useState(false);

    const urlInput = useRef();

    const setUrl = (url)=>{
        urlInput.current = url
    }

    const changeBackground = ()=>{
        console.log(urlInput.current);
        document.getElementById("root").style.backgroundImage=`url(${urlInput.current})`;
        document.getElementById("root").style.backgroundSize="cover";
        document.getElementById("root").style.backgroundPosition="center";
    }    

    const DisplayChange=()=>{

        if(display){
            return(
                <div className="h-screen w-screen flex justify-center items-center">
                    <div className="absolute w-full h-full bg-sky-100 opacity-50 cursor-pointer" onClick={openDisplay}>
                        <br></br>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-10 opacity-100 absolute border border-gray-900 w-2/3 h-2/3 lg:w-1/3 bg-gray-700 rounded-lg text-wrap">
                       
                        <h2 className="text-slate-100 opacity-100 text-3xl text-center">
                            Change The Wallpaper
                        </h2>

                        <h3>I suggest only paste a full url</h3>

                        <input placeholder="Paste the url" type="text" className="text-black w-3/4 rounded-lg" value={urlInput.current} onChange={e=>setUrl(e.target.value)}/>
                        
                        <div
                        className="bg-cyan-500 rounded-lg py-1 px-3 text-lg text-gray-900 ease-in-out transition-all duration-200 hover:scale-125 hover:bg-cyan-300" 
                        onClick={changeBackground}
                        >
                            <h2>Change</h2>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const openDisplay=()=>{
        setDisplay(!display)
    }

    return (
        <div className="absolute">
            <div className='m-6 absolute cursor-pointer ease-in-out transition-all duration-200 hover:scale-150' onClick={openDisplay}>
                <Icon path={mdiCog} size={1.3}/>
            </div>


            <DisplayChange className="absolute"></DisplayChange>
        </div>
    )
}