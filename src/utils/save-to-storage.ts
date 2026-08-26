export default function saveToStorage(key,value){
    localStorage.setItem(key,JSON.stringify(value))
}