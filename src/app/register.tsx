import { Input } from '@/components/input'
import { Image, View, StatusBar, Alert } from 'react-native'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { Button } from '@/components/button'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { api } from '@/server/api'
import axios from 'axios'
export default function Home() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const EVENT_ID = "2b9b126e-ea39-4580-90ca-ebb07cec2384";

    async function handleRegister() {
        try {
            if (!nome.trim() || !email.trim()) {
                return Alert.alert("Inscrição", "Preencha todos os campos!")
            }
            
            const registerResponse = await api.post(`/api/attendees/${EVENT_ID}/register`, {
                name: nome,
                email: email
            })

            console.log(registerResponse.data);
            if (registerResponse.data.id) {

                Alert.alert("Inscrição", "Inscrição realizada com Sucesso!", [
                    {
                        text: "OK", onPress: () => {
                            router.push("/ticket")
                        },
                    }
                ])
            }


        } catch (error) {
            console.log(error)

            if(axios.isAxiosError(error))
            {   console.log(error.response?.data)
                if(String(error.response?.data.message).includes("You can not register twice on the same event.")){
                    return Alert.alert("Alerta", "Essa credencial já foi gerada!")
                }
            }

           
            Alert.alert("Erro", "Lamentamos pelo incomado, mas não conseguimos realizar a inscrição.")
        }finally{
            setIsLoading(false)
        }


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
                    isLoading={isLoading}
                />
                <Link href="/" className=' text-gray-50 text-base text-center mt-8'>Já tem o ingresso?</Link>

            </View>

        </View>
    )
}