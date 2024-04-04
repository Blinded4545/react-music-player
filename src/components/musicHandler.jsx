import {useState, useEffect, useRef} from "react"
import {mdiPause, mdiPlay, mdiSkipNext, mdiSkipPrevious} from "@mdi/js";
import Icon from "@mdi/react";

export function ProgressBar({duration, chnSlide}){



    //Timestamp handlers
    const [currPercent, setCurrPercent] = useState(0);

    const [currTime, setCurrTime] = useState(1);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(1);

    //const [paused, setPaused] = useState(true);
    const pausedState = useRef(true)

    const [pausedIcon, setPausedIcon] = useState(mdiPlay);

    const PercentPerMinute = duration/100

    //To handle progress of the bar
    useEffect(()=>{

        const updatePercent=setInterval(()=>{
            if(pausedState.current  == false){
                if(currPercent<100){
                    setCurrPercent(currPercent=>currPercent+1);
                }else{
                    clearInterval(updatePercent)
                }
            }else{
                //pass
            }
        },PercentPerMinute*1000);

        return () => clearInterval(updatePercent);

    }, [currPercent]);


    //To handle timestamps update and pause events
    useEffect(()=>{
        const updateTime = setInterval(()=>{
            console.log(pausedState.current );
            if(pausedState.current  == false){
                if(currTime<=duration){
                    setMinutes(Math.floor(currTime/60)>minutes ? minutes+1 : minutes)
                    setSeconds(Math.floor(currTime%60)>=60 ? 0 : Math.floor(currTime%60)>=1 ? Math.floor(currTime%60) : 1)
                    setCurrTime(currTime=>currTime+1);
                    console.log(currTime);
                }else{
                    clearInterval(updateTime)
                }
            }
        }, 1000);

        return ()=>clearInterval(updateTime);
    }, [currTime]);

    const pauseEvent = ()=>{


        pausedState.current = !pausedState.current;
        console.log(pausedState.current);
        if(pausedState.current){
            setPausedIcon(mdiPause)
        }else{
            setPausedIcon(mdiPlay)
        }
    }

    //link to carouselComponent function to change music

    const nextSong= (dir)=>{
        chnSlide(dir);
    }

    return(
        <div className="flex flex-col justify-between">
            <div className="flex justify-evenly my-2">
                <div className="cursor-pointer duration-100 transition-all ease-in-out hover:scale-125" onClick={()=>nextSong("prev")}>
                    <Icon path={mdiSkipPrevious} size={1.5} color="white"/>
                </div>
                <div className="cursor-pointer duration-100 transition-all ease-in-out hover:scale-125" onClick={pauseEvent}>
                    <Icon path={pausedIcon} size={1.5} color="white"/>
                </div>
                <div className="cursor-pointer duration-100 transition-all ease-in-out hover:scale-125" onClick={()=>nextSong("next")}>
                    <Icon path={mdiSkipNext} size={1.5} color="white"/>
                </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                <div className="bg-slate-300 rounded-full h-1.5 dark:bg-blue-500" style={{width: currPercent+"%"}}></div>
            </div>
            <div className="flex justify-between">
                <span className="font-mono">{minutes}:{seconds>=10 ? seconds : "0"+seconds}</span>
                <span className="font-mono">{Math.floor(duration/60)}:{Math.floor(duration%60)}</span>
            </div>
        </div>
    )
}