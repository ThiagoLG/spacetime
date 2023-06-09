import { View, Text, TouchableOpacity } from 'react-native'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { api } from '../src/lib/api'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import {
  DiscoveryDocument,
  makeRedirectUri,
  useAuthRequest,
} from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'

const discovery: DiscoveryDocument = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/47f17d66e969949b2a7e',
}

export default function App() {
  const router = useRouter()

  const [, response, promptAsync] = useAuthRequest(
    {
      clientId: '47f17d66e969949b2a7e',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data

    SecureStore.setItemAsync('token', token)

    router.push('/memories')

    // .then((response) => {
    //   const { token } = response.data
    //   SecureStore.setItemAsync('token', token)
    // })
    // .catch((error) => console.error(error))
  }

  useEffect(() => {
    // console.log(
    //   makeRedirectUri({
    //     scheme: 'nlwspacetimenlwspacetime',
    //   }),
    // )

    if (response?.type === 'success') {
      const { code } = response.params

      handleGithubOAuthCode(code)
    }
  }, [response])

  return (
    <View className="relative flex-1 items-center p-8">
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Your time capsule
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Collect memorable moments from your journey and share them with the
            world{' '}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => promptAsync()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Register Memory
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-300">
        Made with 💜 on Rocketseat{"'"}s NLW
      </Text>
    </View>
  )
}
