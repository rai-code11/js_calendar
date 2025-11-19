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
const cell = 3;
// カレンダー全体の幅を計算
const width = cell * 7;
// タイトルを中央に配置して表示
console.log(
  calenderTitle.padStart((width + calenderTitle.length) / 2).padEnd(width)
);

// 曜日の配列を定義
const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
console.log(weekdays.join("  "));

// 日付部分を作成するために1~31日の配列を作成する
// for文
// const _days = [];
// for (let i = 0; i < 31; i++) {
//   _days.push(i + 1);
// }

// Array.form
const days = Array.from({ length: 31 }, (_, i) => i + 1);

// 日付を表示させるために該当月の最終日を求める
// 日付の数を精査するために月のリストを作る
const monthDays31 = [1, 3, 5, 7, 8, 10, 12];
const monthdays30 = [4, 6, 9, 11];

// うるう年を求める関数を定義する
const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getLastDayElement = (year, month, days) => {
  let daysInMonth;

  if (month === 2) {
    daysInMonth = isLeapYear(year) ? 29 : 28;
  } else if 
};

if (month === monthDays31) {
  const last_day = days[30];
} else if (month === monthDays30) {
  const last_day = days[29];
} else {
  if (isLeapYear(year)) {
    const last_day = days[28];
  } else {
    const last_day = days[27];
  }
}

// 1日を特定しセットバック数を決めるために1日を位置を取得する
const day1 = now.setDate(1);
// 曜日の数字を求める
const day1Num = now.getDay();

// 1日の位置を指定するために曜日の数字分1日の前に空白を入れる
