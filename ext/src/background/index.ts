/**
 * Background Service Worker
 */
/// <reference types="chrome" />

chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  if (message.type === 'SAVE_LOG') {
    handleSaveLog(message.data);
  }
  return true;
});

async function handleSaveLog(data: any) {
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbxTEPAC3PFdFfjTOFMxVGgLEIm4VX_XlHMce530fnVrE4fNxz5YCMAFQ1F8qcagehjBEQ/exec'; // ユーザーがデプロイしたURLに置き換える必要がある

  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'no-cors' // GAS ウェブアプリは CORS 回避が必要な場合がある
    });
    console.log('Successfully sent to GAS', response);
  } catch (error) {
    console.error('Error sending to GAS', error);
  }
}
