/**
 * Background Service Worker
 */
/// <reference types="chrome" />

chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  if (message.type === 'SAVE_LOG') {
    handleSaveLog(message.data)
      .then(result => sendResponse({ success: true, result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep the channel open for async response
  }
});

async function handleSaveLog(data: any) {
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbxTEPAC3PFdFfjTOFMxVGgLEIm4VX_XlHMce530fnVrE4fNxz5YCMAFQ1F8qcagehjBEQ/exec';

  const response = await fetch(GAS_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    // mode: 'cors' (デフォルト) でレスポンスを読み取れるようにする
  });

  if (!response.ok) {
    throw new Error(`GAS HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
