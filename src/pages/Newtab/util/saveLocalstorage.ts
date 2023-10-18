function saveLocalstorage(key: string , data: object | string | boolean) {
    localStorage.setItem(key, typeof data === 'string' ? data : JSON.stringify(data))
}
 
export default saveLocalstorage