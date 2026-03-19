function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // スプレッドシートへの書き込み
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Logs');
    if (!sheet) {
      sheet = ss.insertSheet('Logs');
      sheet.appendRow(['Date', 'Title', 'URL', 'Query', 'Content', 'Sources']);
    }

    sheet.appendRow([
      new Date(),
      data.title,
      data.url,
      data.query,
      data.answer,
      data.sources ? data.sources.join('\n') : ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function setup() {
  // 初期設定用のダミー関数
}

function setup() {
  // 初期設定用のダミー関数
}
