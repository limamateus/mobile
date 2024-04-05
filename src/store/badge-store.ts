import {create} from "zustand"

export type BadgeProps = {
    id: string
    name: string
    email: string
    eventTitle: string
    checkInUrl: string
    image?:string
}

export type CheckinProps ={
    attendee_Id : string,
    id: string
   
}

type StateProps = {
    data: BadgeProps | null
    save : ( data : BadgeProps) => void
}
export const useBadgeStore = create<StateProps>((set) =>({
    data : null,
    save:(data:BadgeProps) => set( () => ({data})),
}))

