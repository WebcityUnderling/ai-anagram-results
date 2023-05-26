<template>
    <div class="puzzle">
      <p class="puzzle__current-guess">Current Guess: {{ currentGuess }}</p>
    
      <ul class="puzzle__letter-buttons">
        <li v-for="(letter, index) in letters" :key="index">
          <button @click="appendToCurrentGuess(letter)" class="puzzle__letter-button">{{ letter }}</button>
        </li>
      </ul>
    
      <!-- Action buttons div added by me -->
      <div class="action-buttons"> 
        <button @click="submitGuess" class="puzzle__submit-button">Submit</button>
        <button @click="clearCurrentGuess" class="puzzle__clear-button">Clear</button>
        <button @click="hint" class="puzzle__hint-button">Hint</button>
        <button @click="cheat" class="puzzle__cheat-button">Cheat</button>
      </div>
      <!-- Found answers div added by me -->
      <div class="found-answers">
        <p class="puzzle__found-answers">Found Answers:</p>
        <ul class="puzzle__found-answers-list">
          <li v-for="(answer, index) in foundAnswers" :key="index" class="puzzle__found-answer">{{ answer }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Puzzle',
    props: {
      letters: {
        type: Array,
        required: true
      },
      answers: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        currentGuess: '',
        foundAnswers: []
      };
    },
    methods: {
      appendToCurrentGuess(letter) {
        this.currentGuess += letter;
      },
      submitGuess() {
        if (this.answers.includes(this.currentGuess) && !this.foundAnswers.includes(this.currentGuess)) {
          this.foundAnswers.push(this.currentGuess);
        }
        this.clearCurrentGuess();
      },
      clearCurrentGuess() {
        this.currentGuess = '';
      },
      cheat() {
        const availableAnswers = this.answers.filter(answer => !this.foundAnswers.includes(answer));
        if (availableAnswers.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableAnswers.length);
          const randomAnswer = availableAnswers[randomIndex];
          this.foundAnswers.push(randomAnswer);
        }
      },
      hint() {
        const availableAnswers = this.answers.filter(answer => !this.foundAnswers.includes(answer));
        if (availableAnswers.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableAnswers.length);
          const randomAnswer = availableAnswers[randomIndex];
          const firstTwoLetters = randomAnswer.slice(0, 2);
          this.currentGuess = firstTwoLetters;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .puzzle {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    margin: 0 auto;

    background-color: #f9f9f9;
    font-family: sans-serif;

    /* Added by me */
    color: #000;
  } 
  
  .puzzle__current-guess {
    font-size: 24px;
    text-align: left;
  }
  
  .puzzle__letter-buttons {
    display: flex;
    justify-content: center;
    gap: 5px;
    padding: 0;

    /* added by me */
    list-style-type: none; 
  }
  
  .puzzle__letter-button {
    padding: 10px 20px;
    font-weight: bold;
  }

  /* Action buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 5px;

  /* added by me */
  justify-content: center;
}
  
  .puzzle__submit-button {
    padding: 10px 20px;
    font-weight: bold;
    cursor: pointer;
    background-color: #27ae60;
    color: #fff;
  }
  
  .puzzle__clear-button {
    padding: 10px 20px;
    font-weight: bold;
    cursor: pointer;
    background-color: #c0392b;
    color: #fff;
  }
  
  .puzzle__hint-button {
    padding: 10px 20px;
    font-weight: bold;
    cursor: pointer;
    background-color: #f39c12;
    color: #fff;
  }
  
  .puzzle__cheat-button {
    padding: 10px 20px;
    font-weight: bold;
    cursor: pointer;
    background-color: #3498db;
    color: #fff;
  }

  .found-answers {
    text-align: center;
    margin-top: 30px;

    /* Added by me */
    width: 100%
  }
  
  .puzzle__found-answers {
    font-weight: bold;
    text-align: center;
  }
  
  .puzzle__found-answers-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    text-align: center;
    
    /* Added by me */
    list-style-type: none;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .puzzle__found-answers-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .puzzle__found-answer {
    /* Styles for each Found Answer */
  }



/* Raw output from Chat GPT, it let me know I would have to translate these styles to match the proper class names */
/* Overall layout */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

/* Current Guess */
.current-guess {
  font-size: 24px;
  text-align: left;
}

/* Letter buttons */
.letter-buttons {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.letter-button {
  padding: 10px 20px;
  font-weight: bold;
}

/* Action buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 5px;
}

.action-button {
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
}

/* Found Answers */
.found-answers {
  text-align: center;
  margin-top: 30px;
}

.found-answers-heading {
  font-weight: bold;
  text-align: center;
}

/* List of found answers */
.found-answers-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  text-align: center;
}

/* Responsive design */
@media (max-width: 768px) {
  .found-answers-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Color scheme */
body {
  background-color: #f9f9f9;
  font-family: sans-serif;
}

.submit-button {
  background-color: #27ae60;
  color: #fff;
}

.clear-button {
  background-color: #c0392b;
  color: #fff;
}

.hint-button {
  background-color: #f39c12;
  color: #fff;
}

.cheat-button {
  background-color: #3498db;
  color: #fff;
}

.action-button:hover,
.action-button:focus {
  opacity: 0.8;
}

/* Additional hover and focus state on action buttons */

  </style>
  