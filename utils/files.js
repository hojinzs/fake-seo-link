const getFileExtension = (filename) => {
    const splitting = filename.split('.')
    return splitting[splitting.length - 1]
}

export {
    getFileExtension
}
