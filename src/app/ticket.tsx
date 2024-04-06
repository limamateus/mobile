import { Button } from "@/components/button";
import { Credential } from "@/components/credential";
import { Header } from "@/components/header";
import { colors } from "@/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Modal, ScrollView, Share, StatusBar, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import { QRCode } from "@/components/qrcode";
import  {useBadgeStore} from "@/store/badge-store"
import { Redirect } from "expo-router";
import { MotiView } from "moti";

export default function Ticket() {

    //const [image,setImage] = useState('') // useState que tem a responsabilidade de mudar e pegar a imagem do usuario
    const [expandQRCode,setExpandQRCode] = useState(false) // useState que tem responsabilidade de abrir e fechar o modal

    const badgeStore = useBadgeStore();
    async function handleShare() {
        try {
            if(badgeStore.data?.id){
                await Share.share({
                    message: badgeStore.data.id,                   

                })
            }
            
        } catch (error) {
            console.log(error)
            
            Alert.alert("Compartilhar","Não foi possivel compartilhar!")
        }
    }
    async function handleSelectImage( ){ // Função para buscar uma imagem
        try { // Tratamento de Esseção 
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, // Tipo do arquivo
                allowsEditing:true , // Permissão para editar a imagem
                aspect:[4,4], // Tamanho padrão da imagem

            })

            if(result.assets){ // Verifico se tem informação 
               badgeStore.updataAvatar(result.assets[0].uri) // pega o caminho da imagem.
            }
            
        } catch (error) { // Caso de algum erro
            console.log(error) // Caso de algum erro eu mostro no console
            Alert.alert("Foto", "Não foi possivel selecionar a imagem.") // Mostro uma alerta informando 

        }



    }
   
    if(!badgeStore.data?.id)
    {
        return <Redirect href="/"/>
    }
    return (
        <View className=" flex-1 bg-green-700">
            <StatusBar barStyle="light-content" />



            <Header title="Minha  Credencial" />

            <ScrollView className=" -mt-28 -z-10" 
                contentContainerClassName="px-16 pb-8"
                showsVerticalScrollIndicator={false}>
                <Credential  
                onChangeAvatar={handleSelectImage}
                onShowQRCode={() => setExpandQRCode(true)}              
                data={badgeStore.data}
                /> 
                <MotiView
                from={{
                    translateY: 0
                }}
                animate={{
                    translateY:10
                }}
                transition={{
                    loop:true,
                    type:"timing",
                    duration:700
                }}
                >
                <FontAwesome name="angle-double-down"
                    color={colors.gray[300]}
                    size={24}
                    className=" self-center my-6"
                /> 
                </MotiView>
               

                <Text className=" text-white font-bold text-2x1 mt-4">
                    Compartilhar credencial
                </Text>
                <Text className=" text-white font-regular text-base mt-1 mb-6">
                    Mostre ao mundo que vai participar do maior evendo do Brasil
                </Text>
                <Button title="Compartilar"
                onPress={handleShare}
                />

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => badgeStore.remove()}
                > 
                    <View className=" mt-10">
                        <Text className="text-base text-white font-bold text-center"> Remover Ingresso </Text>

                    </View>
                </TouchableOpacity>
            </ScrollView>

          

            <Modal visible={expandQRCode} statusBarTranslucent={true} animationType="slide"> 
                <View className="flex-1 bg-green-700 items-center justify-center">
                    <QRCode value={"testes"} size={300}/>
                    
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setExpandQRCode(false)}>
                        <Text className=" text-orange-500  text-base  font-bold text-center mt-10">Fechar QRCode</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}