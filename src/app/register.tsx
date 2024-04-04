import { Input } from '@/components/input'
import { Image, View, StatusBar, Alert } from 'react-native'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { Button } from '@/components/button'
import { Link, router } from 'expo-router'
import { useState } from 'react'

export default function Home() {
    const [nome,setNome] = useState("")
    const [email,setEmail] = useState("")
    function handleRegister(){
        if(!nome.trim() || !email.trim()){
            return Alert.alert("Inscrição", "Preencha todos os campos!")
        }


        router.push("/ticket")

    }
    return (
        <View className="flex-1 bg-green-700 items-center justify-center p-8">
            <StatusBar barStyle="light-content" />
            <Image
                source={require('@/assets/logo.png')}  // Caminho da imagem
                className="h-16" // estilo da imagem
                resizeMode='contain' // Ajuste da imagem 
            />

            <View className='w-full mt-12 gap-3'>
                <Input>
                    <FontAwesome6 name="user-circle" size={20} color={colors.green[200]} />
                    <Input.Field
                        placeholder='Nome Completo'
                        onChangeText={setNome}
                    />
                </Input>
                <Input>
                    <MaterialIcons name="alternate-email" size={20} color={colors.green[200]} />
                    <Input.Field
                        keyboardType='email-address'
                        placeholder='Email'
                        onChangeText={setEmail}
                    />
                </Input>
                <Button
                onPress={handleRegister}
                    title='Acessar credencial'
                    isLoading={false}
                />
                <Link href="/" className=' text-gray-50 text-base text-center mt-8'>Já tem o ingresso?</Link>

            </View>

        </View>
    )
}