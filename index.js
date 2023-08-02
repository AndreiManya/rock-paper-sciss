import { ask } from 'stdio'
import secureRandom from 'secure-random'
import { SHA3 } from 'sha3'
import CryptoJs from 'crypto-js'
import { table } from 'table'

class Validation {
  isValid(moves) {
    if (moves.length < 3 || !moves.length) {
      console.log('Please, enter 3 or more moves')
      return false
    }
    if (moves.length % 2 === 0) {
      console.log('Number of moves should be even (3,5,7,9 and etc.)')
      return false
    }
    if (moves.length !== new Set(moves).size) {
      console.log('Moves should be unique')
      return false
    }
    return true
  }
}

class AI {
  constructor() {
    this._compMove = null
    this._key = null
    this._hmac = null
  }
  genKey() {
    //generate key
    const randomSecure = secureRandom(256, { type: 'Buffer' })
    this._key = new SHA3(256).update(randomSecure).digest('hex')
    return this._key
  }
  genMove(moves) {
    //make computer move
    const random = Math.floor(Math.random() * moves.length)
    this._hmac = CryptoJs.HmacSHA3(moves[random], this.genKey())
    return [random, this._hmac, this._key]
  }
}

class Switch {
  dispense(userMove, ...data) {
    switch (userMove) {
      case '?':
        new Table().makeMatrix(data[0])
        break
      case '0':
        break
      default:
        new Game().start(userMove, data)
    }
  }
}

class Game {
  start(userMove, data) {
    const [moves, compMove, key] = data
    const result = new Couter().count(compMove, userMove - 1, moves.length)
    console.log(
      `You ${result}\nComp move ${moves[compMove]}\nYou move ${moves[userMove - 1]}\n${key}`,
    )
  }
}

class Couter {
  count(a, b, length) {
    const half = Math.floor(length / 2)
    if (a === b) return 'draw'
    return (b > a && b - a <= half) || (b < a && a - b > half) ? 'win' : 'loose'
  }
}

class Table {
  makeMatrix(moves) {
    const myMatrix = []
    const size = moves.length + 1
    const result = new Couter()
    for (let i = 0; i < size; i++) {
      myMatrix[i] = []
      for (let j = 0; j < size; j++) {
        if (i === 0 && j === 0) {
          myMatrix[i][j] = 'v PC/User >'
        } else if (i === 0 && j !== 0) {
          myMatrix[i][j] = moves[j - 1]
        } else if (i !== 0 && j === 0) {
          myMatrix[i][j] = moves[i - 1]
        } else {
          myMatrix[i][j] = result.count(i, j, moves.length)
        }
      }
    }
    this.render(myMatrix)
  }
  render(matrix) {
    console.log(table(matrix))
  }
}

class User {
  async getMove(hmac, moves) {
    const userMove = await ask(
      `HMAC: ${hmac}\nAvailable moves:\n${moves
        .map((e, i) => `${i + 1} - ${e}`)
        .join('\n')}\n? - help\n0 - exit\nEnter your move`,
      { options: [...moves.map((_, i) => `${i + 1}`), '?', '0'] },
    )
    return userMove
  }
}

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
