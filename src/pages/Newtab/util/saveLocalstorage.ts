function saveLocalstorage(data: object) {
    localStorage.setItem('anichinu-links', JSON.stringify(data))
}
 
export default saveLocalstorage