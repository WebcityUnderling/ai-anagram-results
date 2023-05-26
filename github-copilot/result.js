import Head from 'next/head'
import {useState} from 'react'

//Anagram Puzzle Game

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
} //fom stack overflow

function findGuessInAnswers(guess, answers) {
  // I have removed it, but it kept trying to access the setters within the component. Doesn't seem to grasp the scope
  return answers.find(answer => answer === guess)
}

function cheatGuess(answers, foundWords) {
  // find the first answer that is not in found words
  // I have removed it, but it kept trying to access the setters within the component. Doesn't seem to grasp the scope
  return answers.find(answer => !foundWords.includes(answer))
}

export const getStaticProps = async ({ }) => {
  const loadPuzzle = await import('@/puzzles/climate.json')
  const word = shuffleArray(loadPuzzle.puzzle_word_array);
  const answers = shuffleArray(loadPuzzle.puzzle_answers);
  return { props: { word, answers } }
}

export default function Home({word, answers}) {
  //reactive guess
  const [guess, setGuess] = useState('')
  //reactive tiles 
  const [tiles, setTiles] = useState(word)

  //reactive found words
  const [foundWords, setFoundWords] = useState([])

  //reactive answer not found
  const [answerNotFound, setAnswerNotFound] = useState(false)

  //reactive answer already found
  const [answerAlreadyFound, setAnswerAlreadyFound] = useState(false)

  //shuffle tiles event handler
  const handleShuffleTiles = () => {
    // setTiles(shuffleArray(tiles)) Did not initially spread, as it should have
    setTiles([...shuffleArray(tiles)])
  }

  const handleAnswerNotFound = () => {
    setAnswerNotFound(true)
    //set timeout to return answer not found to false after 1 second
    setTimeout(() => {
      setAnswerNotFound(false)
    }, 1000)
  }

  const handleAnswerAlreadyFound = () => {
    setAnswerAlreadyFound(true)
    //set timeout to return answer not found to false after 1 second
    setTimeout(() => {
      setAnswerAlreadyFound(false)
    }, 1000)
  }

  const handleGuess = async () => {
    //check if guess is in answers
    const foundAnswer = await findGuessInAnswers(guess, answers)
    //if answer is found, and the answer is not already in found answers
    if (foundAnswer && !foundWords.includes(foundAnswer)) {
      //add answer to found answers
      // setFoundWords(foundWords, foundAnswer) Did not initially spread, as it should have
      setFoundWords([...foundWords, foundAnswer])
    } else if (foundWords.includes(foundAnswer)) {
      //if answer is already found, display message
      handleAnswerAlreadyFound()
    } else {
      //if answer is not found, display message
      handleAnswerNotFound()
    }
    //clear guess
    setGuess('')
  }

  const handleCheat = async () => {
    const cheat = await cheatGuess(answers, foundWords);
    // setFoundWords(foundWords, cheat) It just doesn't want to spread an array..
    setFoundWords([...foundWords, cheat])
  }

  return (
    <>
      <Head>
        <title>Anagram Puzzle Game</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='puzzle'>
          <div className='messages'>
            {/* if all answers have been found, display message */}
            {foundWords.length >= answers.length && <p className='message'>You found all the answers!</p>}
            {/* if not all answers have been found, display number of words yet to find */}
            {foundWords.length < answers.length && <p className='message'>{answers.length - foundWords.length} words left to find</p>}
          </div>
          <div className='guess'>
            <div className='guess-letters'>
              <p className='letter'>{guess}</p>
            </div>
            <div className='guess-status'>
                {/* if anser not found, display message */}
                {answerNotFound && <p className='message--not-found'>Not an answer</p>}
                {/* if answer already found, display message */}
                {answerAlreadyFound && <p className='message--already-found'>Already found</p>}
            </div>
          </div>
          {foundWords.length < answers.length &&
            <div className='letters'>
              {/* map tiles as buttons with a click event to update current guess */}
              {tiles.map((letter, index) => (
                <button className='letter' key={index} onClick={() => setGuess(guess + letter)}>{letter}</button>
              ))}
            </div>
          }
          {foundWords.length < answers.length &&
            <div className='actions'>
              {/* Button to try current guess */}
              <button onClick={handleGuess}>Try</button>
              {/* button to clear current guess */}
              <button onClick={() => setGuess('')}>Clear</button>
              {/* button to shuffle tiles */}
              <button onClick={handleShuffleTiles}>Shuffle</button>
              {/* button to cheat */}
              <button onClick={handleCheat}>Cheat</button>
            </div>
          }         
          <div className='answers'>
            <ul>
              {/* map found words as list items */}
              {foundWords.map((word, index) => (
                <li className="answer" key={index}>{word}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
