import CustomInput from '@/components/CustomInput'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useToast } from 'react-native-toast-notifications'

const Onboarding = () => {
    const toast = useToast();
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);

    const handleGetStarted = () => {
        if (!username) {
            toast.show("Please choose a username to continue", {
                type: 'danger'
            });
            return;
        }
        router.push('/routes/RoutesList');
    }

    return (
        <SafeAreaView className='bg-white flex-1'>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 20
                }}
            >
                <View className='flex-1 justify-center px-6 font-rubik'>
                    <Ionicons
                        name='chatbubble-ellipses-outline'
                        size={50}
                        color='#8A2BE2'
                        className='mt-8'
                    />
                    <Text className='text-xl mt-5 font-bold font-rubik'>
                        <Text>Welcome to </Text>
                        <Text className='text-violet-600'>
                            Bus Connect
                        </Text>
                    </Text>
                    <Text className='text-gray-500 mt-3'>
                        Stay punctual and organized with our app
                    </Text>
                    <View className='mt-8 w-full'>
                        <CustomInput
                            onChangeText={(val: string) => setUsername(val)}
                            label='Choose Username'
                            placeholder='Enter your username'
                            containerStyles='mb-6'
                        />
                        <TouchableOpacity
                            onPress={handleGetStarted}
                            className='bg-violet-600 w-full px-4 py-3 rounded-lg'
                            style={{
                                elevation: 5,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                            }}
                        >
                            <Text className='text-white text-lg font-bold text-center'>
                                Get Started
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Onboarding