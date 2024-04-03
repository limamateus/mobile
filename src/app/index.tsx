import { Input } from '@/components/input'
import{ Image, View,StatusBar} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { Button } from '@/components/button'
import { Link } from 'expo-router'

export default function Home(){
    return(
        <View className="flex-1 bg-green-700 items-center justify-center p-8">
             <StatusBar barStyle="light-content"/>
           <Image
            source={require('@/assets/logo.png')}  // Caminho da imagem
            className="h-16" // estilo da imagem
             resizeMode='contain' // Ajuste da imagem 
             />

             <View className='w-full mt-12 gap-3'>
                <Input>
                    <MaterialCommunityIcons name='ticket-confirmation' size={20} color={colors.green[200]}/>
                    <Input.Field 
                        placeholder='Codigo do Ingresso'
                    />
                </Input>                
                <Button 
                title='Acessar credencial' 
                isLoading={false}                 
                />
                <Link href="/register" className=' text-gray-100 text-base text-center mt-8'>Ainda não possui ingresso?</Link>
                               
             </View>
            
        </View>
    )
}