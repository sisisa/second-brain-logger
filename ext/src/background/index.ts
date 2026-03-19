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
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbw_gp9aTxWiGPi4hFfClRaX6CHdZAdknVaJJzdfCa8GXXSKl9sVBCkkkvf6n1It-mtMJg/exec';

  const response = await fetch(GAS_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    // mode: 'cors' (デフォルト) でレスポンスを読み取れるようにする
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GAS HTTP error! status: ${response.status}, message: ${errorText.substring(0, 100)}`);
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.warn('AI Learning Log: GAS returned non-JSON response.', text);
    // スプレッドシートには保存できているケースがあるため、status: success を擬似的に返すか検討
    if (text.includes('success') || text.includes('Google') || response.ok) {
      return { status: 'success', note: 'Response was HTML but registration may have succeeded' };
    }
    throw new Error(`Invalid JSON response from GAS: ${text.substring(0, 100)}`);
  }
}
