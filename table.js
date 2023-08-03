import { table } from 'table'
import Counter from './counter.js'

class Table {
  makeMatrix(moves) {
    const myMatrix = []
    const size = moves.length + 1
    const result = new Counter()
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

export default Table
