
import { ProgressBar } from "./musicHandler";


export function CardGen({title="", author, songDuration, imgPath="", changeSlide, audioURL}){
    const cardData=[title, author, songDuration, imgPath];

    return(
        <article className="flex flex-col">
            <header>
                <img src={cardData[3]} alt="Song picture" className=" size-56 rounded-lg sm:size-96"/>
            </header>
            <section className="mt-5 mb-2">
                <strong>
                    <h2 className="text-3xl">{cardData[0]}</h2>
                </strong>
                <span className="text-xl">{cardData[1]}</span>
            </section>
            <footer>
                <ProgressBar chnSlide={changeSlide} duration={songDuration}/>
            </footer>
        </article>
    )
}
