import { ask } from 'stdio'

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

export default User
