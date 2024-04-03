import { useRef } from "react";
import { useState, useEffect } from "react";
import { CardGen } from "./cardsCompontent";
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';


export function CarouselComponent(){
    // const CardCmpa=(()=>{
    //     return (
    //         <CardGen title="Rhapsody" author="Toe" songDuration={280} imgPath="https://i1.sndcdn.com/artworks-zpbWQABvw1jqOPfQ-3SPzfA-t500x500.jpg"/>
    //     )
    // });
    const CardCmpa = {
        title: "Rhapsody",
        author: "Toe",
        songDuration: 238,
        imgPath: "https://i1.sndcdn.com/artworks-zpbWQABvw1jqOPfQ-3SPzfA-t500x500.jpg",
        audioURL: "../assets/Rhapsody.mp3"
    }

    const CardCmpb={
        title: "Tokyo Ghetto",
        author: "Eve",
        songDuration: 255,
        imgPath: "https://i.pinimg.com/originals/f1/65/83/f16583a0d3f993d3fc8358b210ab7e2a.jpg",
        audioURL: "../assets/TokyoGhetto.mp3"
    }

    const CardCmpc = {
        title: "Readymade",
        author: "Ado",
        songDuration: 245,
        imgPath: "https://cdns-images.dzcdn.net/images/cover/9fc9754c69922d82d8b23e3ce6c19805/500x500.jpg",
        audioURL: "../assets/Readymade.mp3"
    }

    const CardCmpd = {
        title: "Count me out",
        author: "Kendrick Lamar",
        songDuration: 288,
        imgPath: "https://media.pitchfork.com/photos/658d8c80f3c653a4dd7f73df/master/pass/Kendrick-Lamar-Mr-Morale-and-the-Big-Steppers.jpg",
        audioURL: "../assets/CountMeOut.mp3"
    }

    const CardCmpe = {
        title: "Ansiedades",
        author: "Mora",
        songDuration: 166,
        imgPath: "https://i1.sndcdn.com/artworks-xpFX4qfxeg39-0-t500x500.jpg",
        audioURL: "../assets/Ansiedades.mp3"
    }

    const listCards = [CardCmpa, CardCmpb, CardCmpc, CardCmpd, CardCmpe];

    const listRef = useRef();

    const [currIndex, setCurrIndex] = useState(0);

    useEffect(()=>{
        const listNode = listRef.current;
        const songNode = listNode.querySelectorAll("div>li")[currIndex];

        if(songNode){
            songNode.scrollIntoView({
                behavior: "smooth"
            });
        }

    }, [currIndex])

    const scrollToImage=(dir)=>{
        if(dir === "prev"){
            setCurrIndex(curr=>{
                const isFirstSlide = currIndex===0;
                return isFirstSlide ? listCards.length-1 : curr-1;
            });
        }
        else{            
            const isLastSlide = currIndex === listCards.length - 1;
            if(!isLastSlide){
                setCurrIndex(curr=>curr+1);
            }else{
                setCurrIndex(0);
            }
        }
    }
    
    const goToSlide=(slideIndex)=>{
        setCurrIndex(slideIndex);
    }

    return (
        <div className="w-full">
            <div className="w-full flex flex-row items-center">
                <div 
                    className="m-5 cursor-pointer ease-in-out transition-all duration-200 hover:scale-150" 
                    onClick={()=>scrollToImage("prev")}
                >
                    <Icon path={mdiArrowLeft} size={2}/>
                </div>
                <div className="overflow-hidden w-full">
                    <ul ref={listRef} className="w-full overflow-hidden whitespace-nowrap list-none">
                        {listCards.map((item)=>{
                            return (

                                <div key={item.id} className="inline-block w-full">
                                    <li className="flex justify-center whitespace-nowrap list-none">
                                            <CardGen 
                                                title={item.title} 
                                                author={item.author} 
                                                songDuration={item.songDuration} 
                                                imgPath={item.imgPath} 
                                                audioURL={item.audioURL}
                                                changeSlide={scrollToImage}
                                            />
                                    
                                    </li>
                                </div>
                            )
                        })}
                    </ul>
                </div>
                <div 
                className="m-5 cursor-pointer ease-in-out transition-all duration-200 hover:scale-150" 
                onClick={()=>scrollToImage("next")}
                >
                    <Icon path={mdiArrowRight} size={2}/>
                </div>
            </div>
                <div className="flex justify-center">
                    {
                        listCards.map((_, idx)=>(
                            <div 
                                className={`cursor-pointer text-xs text-center m-2 hover:text-black hover:scale-150 transition-all duration-500 ease-in-out hover:animate-bounce ${idx === currIndex ? "text-black scale-150 m-2" : ""}`}
                                onClick={()=>{goToSlide(idx)}}>
                                &#9865;
                            </div>
                        ))
                    }
                </div>  
        </div>
    )
}