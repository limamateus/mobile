import { Input } from '@/components/input'
import { Image, View, StatusBar, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { Button } from '@/components/button'
import { Link, Redirect } from 'expo-router'
import { useState } from 'react'
import { useBadgeStore } from "@/store/badge-store"
import { api } from '@/server/api'

export default function Home() {
    const [ingresso, setIngresso] = useState("")
    const [isLoading, setLoading] = useState(false)

    const badgeStore = useBadgeStore();

    async function handleAcessCredential() {

        try {

            if (!ingresso.trim()) {
                return Alert.alert("Ingresso", "Informe o código do ingresso!")
            }
            setLoading(true)

         

            const response = await (await api.get(`api/checkin?code=${ingresso}`))
            console.log(response.data)
           
            if(response.data.attendee_Id){
              
                try {
                     
                    const respota = await api.get(`api/attendees/attendee/${response.data.attendee_Id}`)   
                    console.log(respota.data)                                                
                    badgeStore.save(respota.data) 
                    badgeStore.upDateCode(ingresso)  
                    badgeStore.upDateEvent(respota.data.event.title, respota.data.event.details)

                } catch (error) {
                    console.log(error)
                    Alert.alert("Ingresso", "Não foi possivel encontrar seu registro no evento.")

                }
               
            }

            console.log("Dados", badgeStore.data)

        } catch (error) {

            setLoading(false)
            Alert.alert("Igresso", "Ingresso não encontrado!")
        } finally {
            setLoading(false)
        }

    }

    if(badgeStore.data?.id){
        return<Redirect href="/ticket"/>
    }

    return (
        <View className="flex-1  bg-green-900 items-center justify-center p-8">
            <StatusBar barStyle="light-content" />
            <Image
                source={require('@/assets/logo.png')}  // Caminho da imagem
                className="h-16" // estilo da imagem
                resizeMode='contain' // Ajuste da imagem 
            />

            <View className='w-full mt-12 gap-3'>
                <Input>
                    <MaterialCommunityIcons name='ticket-confirmation' size={20} color={colors.green[200]} />
                    <Input.Field
                        placeholder='Codigo do Ingresso'
                        onChangeText={setIngresso}
                    />
                </Input>
                <Button
                    onPress={handleAcessCredential}
                    title='Acessar credencial'
                    isLoading={isLoading}
                />
                <Link href="/register" className=' text-gray-100 text-base text-center mt-8'>Ainda não possui ingresso?</Link>

            </View>

        </View>
    )
}