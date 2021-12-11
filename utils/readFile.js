const readFile = async (imgFile) => {

    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (ev) => {
            const file = ev.target.result
            resolve(file)
        }
        reader.readAsDataURL(imgFile)
    })
}

export {
    readFile
}
