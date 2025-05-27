import { FormInput } from '@/components/FormInput';
import { loginSchema } from '@/types/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View, Pressable } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';

const Login = () => {
    const router = useRouter();
    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email:'',
            password:''
        }
    }) 
    const onSubmit = (data: any) => {
        console.log("hello there")
    }
  return (
    <View className='flex-1 bg-orange-500'>
        <View className='absolute bottom-0 bg-white h-5/6 w-full rounded-t-3xl px-6'>
            <View className='flex items-center justify-center mt-6 mb-4'>
                <Text className="text-black font-bold text-2xl">SupaMenu</Text>
                <Text className="text-black font-bold">Welcome .... </Text>
                <Text className="text-gray-600 font-thin ">Please fill in the information</Text>
            </View>
            <View>
                <FormInput 
                    control={control} 
                    name='email' 
                    label='Email' 
                    keyboardType="email-address"
                    error={errors.email?.message}
                    left={<TextInput.Icon icon="email" />}
                />
                <FormInput 
                    control={control} 
                    name='password' 
                    label='Password' 
                    secureTextEntry
                    error={errors.password?.message}
                    left={<TextInput.Icon icon="lock" />}
                />
                <View className='text-white mt-5 flex-1 justify-center items-center'>
                <Button onPress={handleSubmit(onSubmit)}
                 style={{ backgroundColor: '#ee6222', borderTopEndRadius:12,marginTop: 20, borderRadius: 8, width: '80%' ,height: 50 }}
  labelStyle={{ color: 'white', fontWeight: 'bold' }}> Sign In</Button>
  <Text>_____OR ________</Text>
                <Button onPress={() => console.log("Sign Up")}
                 style={{ backgroundColor: '#ffffff', borderTopEndRadius:12,marginTop: 20, borderRadius: 8, width: '80%' ,height: 50 }}
    labelStyle={{ color: 'white', fontWeight: 'bold' }}> Sign Up</Button>
                <Text className='text-gray-500 '>Don't have an account?
                     <Pressable onPress={()=>{router.replace('/auth/signup')}}></Pressable>
                     </Text>
                </View>

            </View>
        </View>
        </View>
    )
}

export default Login