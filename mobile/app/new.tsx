import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Link } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React, { useState } from 'react'

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets()
  const [isPublic, setIsPublic] = useState(false)
  return (
    <ScrollView
      className="flex-1 p-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NLWLogo />
        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-8">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            thumbColor={isPublic ? '#9b79ea' : '#9e9e90'}
            trackColor={{
              false: '#767577',
              true: '#372560',
            }}
          />
          <Text className="font-body text-base text-gray-200">
            Set memory as public
          </Text>
        </View>

        <TouchableOpacity className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20 ">
          <View className="flex-row items-center gap-2">
            <Icon name="image" color="#FFF" />
            <Text className="font-body text-sm text-gray-200">
              Attach image or video
            </Text>
          </View>
        </TouchableOpacity>

        <TextInput
          multiline
          className="p-0 text-justify font-body text-lg text-gray-50"
          placeholder="Feel free to add photos, videos, and stories about this experience that you want to remember forever."
          placeholderTextColor="#56565a"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="self-end rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black">
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
