import { Slot } from 'expo-router'
// Libs
import '../styles/global.css'


// Componentes
import { Loading } from '@/components/loading'
import {
    useFonts,
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular
} from '@expo-google-fonts/roboto'

export default function Layout() {

    const [fontsLoaded] = useFonts({
        Roboto_700Bold,
        Roboto_500Medium,
        Roboto_400Regular
    })

    if (!fontsLoaded) {
        <Loading />
    }


    return <Slot />
}