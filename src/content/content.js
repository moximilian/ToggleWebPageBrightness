chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const mapper = {
    setBrightness: (value) => {
      value !== undefined &&
        (document.documentElement.style.filter = `brightness(${request.value / 100})`) &&
        sendResponse({ status: 'success' })
    },
  }
  mapper[request.action](request.value)
  return true
})
