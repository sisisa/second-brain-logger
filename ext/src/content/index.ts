/**
 * Content Script for Perplexity
 */
/// <reference types="chrome" />

console.log('AI Learning Log: Content Script Loaded');

function injectButton() {
  // ボタンが既に存在するか確認
  if (document.getElementById('ai-learning-log-btn')) return;

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

  btn.onclick = async () => {
    try {
      const data = extractData();
      const response = await chrome.runtime.sendMessage({ type: 'SAVE_LOG', data });
      
      if (!response || !response.success) {
        throw new Error(response?.error || 'Unknown error from background script');
      }

      // フィードバックの改善
      const originalHTML = btn.innerHTML;
      const originalBG = btn.style.backgroundColor;
      
      btn.innerHTML = '✅ <span>Saved!</span>';
      btn.style.backgroundColor = '#28a745';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.backgroundColor = originalBG;
        btn.disabled = false;
      }, 3000);
    } catch (error: any) {
      console.error('AI Learning Log: Error', error);
      if (error.message.includes('Extension context invalidated')) {
        alert('拡張機能が更新されました。ページを再読み込みしてください。');
      } else {
        alert('保存中にエラーが発生しました: ' + error.message);
      }
    }
  };

  document.body.appendChild(btn);
}

function extractData() {
  try {
    const title = document.title;
    const url = window.location.href;
    
    // 質問と回答の抽出
    const queries = Array.from(document.querySelectorAll('h1, h2')).map(el => (el as HTMLElement).innerText);
    const answers = Array.from(document.querySelectorAll('.prose')).map(el => (el as HTMLElement).innerText);

    // ソースURLの抽出
    const sourceLinks = Array.from(document.querySelectorAll('a[href^="http"]'))
      .filter(a => {
        const parent = a.closest('[class*="source"], [class*="citation"], [class*="reference"]');
        return parent !== null;
      })
      .map(a => (a as HTMLAnchorElement).href);
    
    // 重複削除
    const uniqueSources = [...new Set(sourceLinks)];

    return {
      title,
      url,
      query: queries[0] || 'Unknown Query',
      answer: answers.join('\n\n') || 'No AI Answer found',
      sources: uniqueSources
    };
  } catch (e) {
    console.error('Extraction Error:', e);
    return { title: 'Error', url: '', query: '', answer: '', sources: [] };
  }
}

// 動的な変更に対応するため監視
const observer = new MutationObserver(() => {
  injectButton();
});

observer.observe(document.body, { childList: true, subtree: true });
injectButton();
