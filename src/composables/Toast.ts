import ToastPlugin, { useToast } from "vue-toast-notification"

const toast = useToast()

export const toastDefaultError = ()=>{
    toast.error('Es ist ein Fehler aufgetreten. Versuche es erneut.', {position: 'bottom'})
}