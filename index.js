import Validation from './validation.js'
import AI from './ai.js'
import User from './user.js'
import Switch from './switch.js'

const moves = process.argv.slice(2)
const valid = new Validation().isValid(moves)
if (valid) {
  const [compMove, hmac, key] = new AI().genMove(moves)
  new User()
    .getMove(hmac, moves)
    .then((userMove) => {
      new Switch().dispense(userMove, moves, compMove, key)
    })
    .catch((err) => console.log(err))
}
