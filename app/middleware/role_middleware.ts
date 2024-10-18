import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { Unkey } from '@unkey/api'

// Create a new Unkey instance with your API key
const unkey = new Unkey({
  rootKey: process.env.UNKEY_ROOT_KEY!,
})

export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const apiKey = ctx.request.headers()['authorization']?.split(' ')[1]

    if (!apiKey) {
        return { message: 'Unauthorized' }
    }

    const {result, error } = await unkey.keys.verify({
      apiId: process.env.UNKEY_API_ID!,
      key: apiKey,
      authorization: { permissions: "call-protected-route" },
    })

    if (error) {
      throw new Error(error.message);
    }

    if (!result.valid) {
      console.log("forbidden", result.code);
      return { message: 'Invalid API Key' };
    }
    console.log(ctx)

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}