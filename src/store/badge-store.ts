import {create} from "zustand"
import { createJSONStorage,persist} from "zustand/middleware"
import AsyncStorage from '@react-native-async-storage/async-storage'


 export type BadgeProps = {
    id: string
    name: string
    email: string
    title: string
    details:string
    eventId: string
    attendee_Id: string
    code: string
    image?:string
}


export type CheckinProps ={
    attendee_Id : string,
    id: string
   
}

type StateProps = {
    data: BadgeProps | null
    save : ( data : BadgeProps) => void
    remove: () => void
    updataAvatar:(uri:string) => void
    upDateCode:(codeCheckIn:string) => void
    upDateEvent:(titleEvent:string, detailsEvent:string) => void
}


export const useBadgeStore = create(
    persist<StateProps>(
        (set) =>({
    data : null,
    save:(data:BadgeProps) => set( () => ({data})),
    remove: () => set(() => ({data:null})),
    updataAvatar: (uri:string) => set((state)=> ({
        data: state.data? {...state.data, image: uri} : state.data,
    })),
    upDateCode:(codeCheckIn:string) => set((state) =>({
        data: state.data? {...state.data, code: codeCheckIn} : state.data,
    })),
    upDateEvent:(titleEvent:string, detailsEvent:string) =>set((state) => ({
        data: state.data? {...state.data, title: titleEvent, details: detailsEvent} : state.data,
    }))
}),{
    name: "nlw-unite:badge",
    storage:createJSONStorage( () => AsyncStorage)
}))

