// sysモジュールをインポート

// 入力した文字列をリスト化す// 現在の西暦と月を表示させる
const now = new Date();
// 月を取得、月は0から始まるため+1
const month = now.getMonth() + 1;
// 年を取得
const year = now.getFullYear();
// カレンダーのタイトルを作成
const calenderTitle = `${month}月 ${year}年`;
// セルの幅を定義
const cell = 4;
// カレンダー全体の幅を計算
const width = cell * 7;
// タイトルを中央に配置して表示
console.log(
  calenderTitle.padStart((width + calenderTitle.length) / 2).padEnd(width)
);

// 曜日の配列を定義
const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
console.log(weekdays.join("    "));
