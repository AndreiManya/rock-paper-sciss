import Counter from './counter.js'

class Game {
  start(userMove, data) {
    const [moves, compMove, key] = data
    const result = new Counter().count(compMove, userMove - 1, moves.length)
    console.log(
      `You ${result}\nComp move ${moves[compMove]}\nYou move ${moves[userMove - 1]}\n${key}`,
    )
  }
}

export default Game
