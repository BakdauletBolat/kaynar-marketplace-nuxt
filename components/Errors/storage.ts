import { ref } from "vue";


type Error = {
    uuid?: string,
    timeout: number;
    message: string; 
}

export const errors = ref<Error[]>([]);

export function removeMessage(uuid: string | undefined) {
    const index = errors.value.findIndex(item=>item.uuid == uuid);
    errors.value.splice(index,1);
}
export function pushErrors(error: Error) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
    errors.value.push({...error, uuid: crypto.randomUUID()});
}