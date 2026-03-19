/**
 * GAS Backend for AI Learning Log
 */

const GEMINI_API_KEY = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
const SPREADSHEET_ID = PropertiesService.getActiveSpreadsheet().getId();

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // 1. Gemini APIによる解析
    const analysis = analyzeWithGemini(data.query, data.answer);
    
    // 2. スプレッドシートへの書き込み
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Logs');
    if (!sheet) {
      sheet = ss.insertSheet('Logs');
      sheet.appendRow(['Date', 'Title', 'URL', 'Query', 'Content', 'Summary', 'Tags', 'Topic']);
    }
    
    sheet.appendRow([
      new Date(),
      data.title,
      data.url,
      data.query,
      data.answer,
      analysis.summary,
      analysis.tags.join(','),
      analysis.topic
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', analysis }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function analyzeWithGemini(query, answer) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const prompt = `
    以下の調査結果を分析し、JSON形式で出力してください。
    
    【質問】: ${query}
    【回答】: ${answer}
    
    出力フォーマット:
    {
      "summary": "100文字程度の要約",
      "tags": ["タグ1", "タグ2"],
      "topic": "大まかなカテゴリ"
    }
  `;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" }
  };
  
  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  });
  
  const resData = JSON.parse(response.getContentText());
  const jsonStr = resData.candidates[0].content.parts[0].text;
  return JSON.parse(jsonStr);
}

function setup() {
  // 初期設定用のダミー関数
}
