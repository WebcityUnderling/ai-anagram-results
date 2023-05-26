import Head from 'next/head'
import { useState } from 'react'


// I wrote the Static Props, Almost ChatGPT did everything else.
export const getStaticProps = async ({ }) => {
  const loadPuzzle = await import('@/puzzles/climate.json')
  const letters = loadPuzzle.puzzle_word_array;
  const answers = loadPuzzle.puzzle_answers;
  return { props: { letters, answers } }
}


const Puzzle = ({ letters, answers }) => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [foundAnswers, setFoundAnswers] = useState([]);

  const submitGuess = () => {
    if (answers.includes(currentGuess) && !foundAnswers.includes(currentGuess)) {
      setFoundAnswers(prevFoundAnswers => [...prevFoundAnswers, currentGuess]);
    }
    setCurrentGuess('');
  };

  const cheat = () => {
    const availableAnswers = answers.filter(answer => !foundAnswers.includes(answer));
  
    if (availableAnswers.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableAnswers.length);
      const randomAnswer = availableAnswers[randomIndex];
      setFoundAnswers(prevFoundAnswers => [...prevFoundAnswers, randomAnswer]);
    }
  };

  const hint = () => {
    const availableAnswers = answers.filter(answer => !foundAnswers.includes(answer));
  
    if (availableAnswers.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableAnswers.length);
      const randomAnswer = availableAnswers[randomIndex];
      const firstTwoLetters = randomAnswer.slice(0, 2);
      setCurrentGuess(firstTwoLetters);
    }
  
    // setCurrentGuess(''); 
    //I messed up by asking it to do this. It put it in the wrong place, but it wasn't necessary.
    //I'm calling this my bad
  };
  

  return (
    <div>
      <p>Current Guess: {currentGuess}</p>
      
      <ul>
        {letters.map((letter, index) => (
          <li key={index}>
            <button onClick={() => setCurrentGuess(prevGuess => prevGuess + letter)}>
              {letter}
            </button>
          </li>
        ))}
      </ul>
      
      <button onClick={submitGuess}>Submit</button>
      <button onClick={() => setCurrentGuess('')}>Clear</button>
      <button onClick={() => cheat()}>Cheat</button>
      <button onClick={() => hint()}>Hint</button>
      
      <p>Found Answers:</p>
      <ul>
        {foundAnswers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
};

export default Puzzle;