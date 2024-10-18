import router from '@adonisjs/core/services/router'
import { Unkey } from '@unkey/api'


// Create a new Unkey instance with your API key
const unkey = new Unkey({
  rootKey: process.env.UNKEY_ROOT_KEY!,
})

router.get('/api/v1/public', async () => {
    return 'Heeyaaa!! Touchdown to the public endpoint!!'
})

router.get('/api/v1/protected', async ({ request }) => {
    const apiKey = request.headers()['authorization']?.split(' ')[1]

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

    return 'Woohoo!! Touchdown to the protected endpoint!!'
})