import { Image, ImageBackground, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons"
import { colors } from "@/styles/colors";
import { QRCode } from "./qrcode";
import { BadgeProps } from "@/store/badge-store";
import { api } from "@/server/api";
import {MotiView} from 'moti'

type Props = {
    data: BadgeProps
    image?: string
    onChangeAvatar?: () => void
    onShowQRCode?: () => void
}



export function Credential({data, onChangeAvatar,onShowQRCode }: Props) {
    
    const {height} = useWindowDimensions()
    return (
        <MotiView 
        className=" w-full self-stretch items-center"
        from={{
            opacity:0,
            translateY:-height,
            rotateZ:"50deg",
            rotateY:"30deg",
            rotateX:"30deg"
        }}
        animate={{
            opacity:1,
            translateY:0,
            rotateZ:"0deg",
            rotateY:"0",
            rotateX:"0"
        }}
        transition={{
            type:"spring",
            damping:20,
            rotateZ:{
                damping:15,
                mass:3,
            }
        }}
        >
            <Image source={require("@/assets/ticket/band.png")}
                className=" w-24 h-52 z-10"

            />

            <View className="bg-black/20 self-stretch items-center pb-6
             border-white/10 rounded-2xl -m-5">
                <ImageBackground source={require("@/assets/ticket/header.png")}
                    className=" px-6 py-8 h-40 items-center self-stretch border-b border-white/10
                 overflow-hidden"

                >
                    <View className=" w-full flex-row items-center justify-between">
                        <Text className="text-zinc-50 text-sm font-bold"> {data.title}</Text>
                        <Text className="text-zinc-50 text-sm font-bold">{data.code}</Text>
                    </View>

                    <View className="w-40 h-40 bg-black rounded-full" />
                </ImageBackground>

                {data.image ? (
                    <TouchableOpacity  activeOpacity={0.7}
                    onPressOut={onChangeAvatar}>
                        <Image source={{ uri:data.image }}
                        className="w-36 h-36 rounded-full -mt-24"
                    />
                    </TouchableOpacity>
                    ) : (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPressOut={onChangeAvatar}
                    >
                        <View className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center
                         justify-center" >

                            <Feather name="camera" color={colors.green[400]} size={32} />
                        </View>

                    </TouchableOpacity>

                )}


                <Text className=" font-bold text-2xl text-zinc-50 mt-4">{data.name}</Text>

                <Text className=" font-regular text-base text-zinc-300"> {data.email}</Text>


                <QRCode 
                value="Ola munda"
                size={120}
                        
                /> 
                <TouchableOpacity activeOpacity={0.7} 
                onPressOut={onShowQRCode}
                >
                    <View className=" mt-6 ">
                        <Text className=" font-bold text-orange-500 text-sm">
                            Ampliar QrCode
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
        </MotiView>
    )
}