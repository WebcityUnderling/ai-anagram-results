import Head from 'next/head'
import { useState } from 'react'


// I wrote this, Chat GPT did everything else.
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