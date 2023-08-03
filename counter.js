class Counter {
  count(a, b, length) {
    const half = Math.floor(length / 2)
    if (a === b) return 'draw'
    return (b > a && b - a <= half) || (b < a && a - b > half) ? 'win' : 'loose'
  }
}

export default Counter
