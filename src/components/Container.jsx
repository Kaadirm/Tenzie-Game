import React, {useEffect, useState} from 'react'
import {nanoid} from "nanoid"
import Confetti from "react-confetti";
import { useWindowSize } from '@react-hook/window-size';
import Dies from "./Dies";

function Container() {
    
    //For start creating dice array
    
    const allNewDice = () => {
        const newArr = []
        for(let i = 0; i <10; i++){
            newArr.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            })
        }
        return newArr
    }

    // Variables

    const [diceArr, setDiceArr] = useState(allNewDice())
    const [playerWin, setPlayerWin] = useState(false)
    const [roundCount, setRoundCount] = useState(0)
    // confetti width and height with windowsize hook
    const { width, height } = useWindowSize()
    const [time, setTime] = useState(0)
    const [yourBestScore, setYourBestScore] = useState(
        JSON.parse(localStorage.getItem("bestScore")) || "This is your first game" )



    // Roll Button Function

    const handleClickButton = () => {

        // When player wins it reset everything

        if(playerWin === true){
            setPlayerWin(false)
            setRoundCount(0)
            setDiceArr(allNewDice)
            setTime(0)
        }
        
        // Otherwise rolls every dices that player doesn't hold

        else{
            setDiceArr(preVal => preVal.map(item => {
                return item.isHeld === false ? {...item, value: Math.ceil(Math.random() * 6)} : item
            }))
            setRoundCount(preVal => preVal + 1)
        }
    }

    // Box clicking function to hold dices

    function handleClickBox (id) {
        setDiceArr(preVal => preVal.map(item => {
            return item.id === id ? {...item, isHeld: !item.isHeld} : item
        }) )
    }

    // Checking player wins or game still going

    useEffect( () => { 
            diceArr.every(item => item.isHeld) && diceArr.every(item => item.value === diceArr[0].value) ? setPlayerWin(true) : setPlayerWin(false)
    }, [diceArr])
    
    // Print dice array with map function 

    const diceEl = diceArr.map(item => 
    <div    className={item.isHeld ? "box held" : "box"} 
            onClick={() => handleClickBox(item.id)} 
            key={item.id}>

                {/* With Dies component making dice appearance according to their value */}

                <Dies
                value={item.value}
                />
    </div>)
        
    //Time count for best score
        
    useEffect(() => {
        if(!playerWin){
            const timeCount = setInterval (() => {
                setTime (preVal => preVal + 1)
            }, 1000)
            
            //Return function for clearing side effects from useEffect hook
            
            return () => {
                clearInterval(timeCount)
            }
        }
    }, [playerWin])

    // Setting the best score to local data and getting it when the page on load

    useEffect(() => {
        if(playerWin){

            // checking the type of score 
            // cause it will be a string for the first time when a player plays

            if(typeof(yourBestScore) === "number"){
                if(time < yourBestScore) {
                    setYourBestScore(time)
                    localStorage.setItem("bestScore", JSON.stringify(time))
                }
            }
            else{
                setYourBestScore(time)
                localStorage.setItem("bestScore", JSON.stringify(time))
            }
        }
    }, [playerWin])

  return (
    <>
    <div className="container">
        <div className="main-frame">
            <div className="main-box">
                <div className="game-box">
                    <div className="game-head">
                        <h1 className="content-head">Tenzies</h1>
                        <p className='content-details'>{
                        playerWin ? `Congragulations. You Won! After ${roundCount} round`+`${roundCount > 1 ? "s" : ""} `  : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
                    </div>
                    <div className="record-div">
                        <div>
                            <div>Time</div>
                            <div className="record-info">{time}</div>
                        </div>
                         <div>
                            <div>Your Best Score</div>
                            <div className="record-info">{yourBestScore}</div>
                         </div>
                         
                    </div>
                    <div className="box-numbers">
                        {diceEl}
                    </div>
                    <button className={playerWin ? "roll-button new-game-button" : "roll-button" } onClick={handleClickButton}>{!playerWin ? "Roll" : "    New Game"}</button>
                </div>
            </div>
        </div>
        {playerWin && <Confetti width={width} height={height}/>}
    </div>
    </>
  )
}

export default Container