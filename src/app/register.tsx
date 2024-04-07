import { Input } from '@/components/input'
import { Image, View, StatusBar, Alert } from 'react-native'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { Button } from '@/components/button'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { api } from '@/server/api'
import axios from 'axios'
import { useBadgeStore } from '@/store/badge-store'


export default function Home() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
   
    const badgeStore = useBadgeStore();

    const EVENT_ID = "17df9279-1cf0-4290-b92b-66549b1f7b92"; 
       
    
    async function handleRegister() {
        
        try { //  1 - Aqui estou usando para tentar realizar um registro
            if (!nome.trim() || !email.trim()) { // 2 - Mas antes de realizar as requisições preciso validar o formulario se esta vazio
                return Alert.alert("Inscrição", "Preencha todos os campos!") // 3 - Caso não preecheu retorno um Alertar dizendo para prrencher todos os campos
            }
            // 4 - Vou registar o usuario num evento que por enquanto esta fixo
            const registerResponse = await api.post(`/api/attendees/${EVENT_ID}/register`, {
                name: nome,
                email: email
            })          
            badgeStore.save(registerResponse.data)
            badgeStore.upDateEvent(registerResponse.data.event.title,registerResponse.data.event.details)
            console.log(registerResponse.data);
                try {
                    if (registerResponse.data.id) { // 5 -  Verifico se tem um id no retorno da requisição 
              
                        // Por enquanto eu vou fazer o checkin no momento que ele registra no evento                    
                        const response  = await api.post(`/api/checkin/${registerResponse.data.id}`)  // 7 - realizo o checkin
                        
                        if(response.data.code){ //8 -  Verifico se tem um code 
                         
                           console.log(response.data.code)
                           badgeStore.upDateCode(response.data.code)   
                            Alert.alert("Inscrição", "Inscrição realizada com Sucesso!", [
                                {
                                    text: "OK", onPress: () => { // 9 -  Vou para tela de Ticket
                                        router.push("/ticket")
                                    },
                                }
                            ])
                         }
                        
                    }
                    
                } catch (error) {
                    if(axios.isAxiosError(error))
                    {   console.log(error.response?.data)
                        if(String(error.response?.data.message).includes("There is no room this event.")){
                            return Alert.alert("Alerta", "Evento Esgotado")
                        }
                    }
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