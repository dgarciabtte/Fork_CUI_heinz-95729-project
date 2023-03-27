/**
 * Checks to see if the request includes an active session
 * and returns a response with a boolean answer (e.g.
 * { authenticated: true|false })
 * @returns {IKoaMiddleware}
 */
export const testSession = (/** @type {any} */ _placeholder) => async (ctx) => {
  const { logger } = ctx.state

  try {
    const authenticated = typeof ctx.state === 'object' &&
      typeof ctx.state.session !== 'undefined' && ctx.state.session !== null

    logger.emit('session_test_complete', 'trace', { authenticated })
    ctx.response.status = 200
    ctx.response.body = { authenticated }
  } catch (err) {
    logger.emit('session_test_failed', 'error', { err })
    throw new Error('Failed to check the request session')
  }
}

export default testSession
