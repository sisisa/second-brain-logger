/**
 * Content Script for Perplexity
 */
/// <reference types="chrome" />

console.log('AI Learning Log: Content Script Loaded');

function injectButton() {
  // ボタンが既に存在するか確認
  if (document.getElementById('ai-learning-log-btn')) return;

  // ボタンを表示する親要素を探す
  // Perplexityの仕様に合わせる必要がある
  const actionBar = document.querySelector('div[role="main"]'); // 仮のセレクタ
  if (!actionBar) return;

  const btn = document.createElement('button');
  btn.id = 'ai-learning-log-btn';
  btn.innerHTML = '🚀 <span>Save to Log</span>';
  btn.style.position = 'fixed';
  btn.style.bottom = '30px';
  btn.style.right = '30px';
  btn.style.zIndex = '2147483647'; // 最大のZインデックス
  btn.style.padding = '12px 20px';
  btn.style.backgroundColor = '#00bbff';
  btn.style.color = 'white';
  btn.style.border = '2px solid white';
  btn.style.borderRadius = '30px';
  btn.style.cursor = 'pointer';
  btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
  btn.style.fontSize = '14px';
  btn.style.fontWeight = 'bold';
  btn.style.display = 'flex';
  btn.style.alignItems = 'center';
  btn.style.gap = '8px';
  btn.style.transition = 'transform 0.2s, background-color 0.2s';

  btn.onmouseover = () => {
    btn.style.transform = 'scale(1.05)';
    btn.style.backgroundColor = '#0099dd';
  };
  btn.onmouseout = () => {
    btn.style.transform = 'scale(1)';
    btn.style.backgroundColor = '#00bbff';
  };

  btn.onclick = () => {
    const data = extractData();
    chrome.runtime.sendMessage({ type: 'SAVE_LOG', data });
    alert('Log Sent!');
  };

  document.body.appendChild(btn);
}

function extractData() {
  const title = document.title;
  const url = window.location.href;
  
  // 質問と回答の抽出 (Perplexityの構造に依存)
  const queries = Array.from(document.querySelectorAll('h1, h2')).map(el => (el as HTMLElement).innerText);
  const answers = Array.from(document.querySelectorAll('.prose')).map(el => (el as HTMLElement).innerText);

  return {
    title,
    url,
    query: queries[0] || 'Unknown Query',
    answer: answers[0] || 'No AI Answer found'
  };
}

// 動的な変更に対応するため監視
const observer = new MutationObserver(() => {
  injectButton();
});

observer.observe(document.body, { childList: true, subtree: true });
injectButton();
