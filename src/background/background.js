
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.query({ active: true }, (tabs) => {
    tabs.forEach(tab => {
      if (!tab) return console.error('No active tab')
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          files: ['content/content.js'],
        })
        .then(() => {
          chrome.tabs.sendMessage(tab.id, request)
          sendResponse({ status: 'success', value: request.value })
        })
    })
  })
  return true
})
