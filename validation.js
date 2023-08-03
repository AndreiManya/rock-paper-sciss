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

export default Validation
