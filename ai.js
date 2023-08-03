import CryptoJs from 'crypto-js'
import { SHA3 } from 'sha3'
import secureRandom from 'secure-random'

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

export default AI
