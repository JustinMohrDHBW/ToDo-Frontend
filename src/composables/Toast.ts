import ToastPlugin, { useToast } from "vue-toast-notification"

const toast = useToast()

export const toastError = (msg?:string)=>{
    toast.error(msg ?? 'Es ist ein Fehler aufgetreten. Versuche es erneut.', {position: 'bottom'})
}