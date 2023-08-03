import Table from './table.js'
import Game from './game.js'

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

export default Switch
