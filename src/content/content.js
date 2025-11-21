chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const mapper = {
        setBrightness: setBrightness,
    }
    mapper[request.action](request.value)
    sendResponse({ status: 'success' })
    return true
})

setBrightness = brightness => {
    if (brightness === undefined) return
    document.documentElement.style.filter = `brightness(${brightness / 100})`
}
