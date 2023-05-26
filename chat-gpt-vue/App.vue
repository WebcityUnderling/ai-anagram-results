<template>
    <Puzzle :letters="letters" :answers="answers"/>
</template>

<script>
  import Puzzle from './components/Puzzle.vue'

  export default {
    components: {Puzzle},
    data: () => {
      return {
        letters: ["c", "l", "i", "m", "a", "t", "e"],
        answers: [
          "climate",
          "malice",
          "camel", 
          "claim",
          "email",
          "metal",
          "calm",
          "clam",
          "cite",
          "came",
          "mace",
          "meal",
          "mate",
          "male",
          "mice",
          "lace",
          "lame",
          "lice",
          "lime",
          "time",
          "tile",
          "tail",
          "late",
          "tame",
          "melt",
          "mile",
          "mail",
          "elm",
          "alm",
          "tic",
          "ace",
          "act",
          "aim",
          "cat",
          "ice",
          "mat",
          "met",
          "ale",
          "ail",
          "let"
        ]
      }
    }
  }
</script>