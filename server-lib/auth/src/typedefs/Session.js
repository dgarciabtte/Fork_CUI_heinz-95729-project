import { immutable } from '../../../../server-packages/immutable'
import { z } from 'zod'

const sessionSchema = z.object({
  id: z.string().cuid2(),
  user: z.object({
    id: z.string().cuid2(),
    email: z.string().email(),
    name: z.string().min(2),
  }),
})

/** @type {ImmutableSession} */
const _Session = immutable('Session', sessionSchema)

/** @type {Session} */
export default class Session extends _Session {
  static schema = sessionSchema
}
