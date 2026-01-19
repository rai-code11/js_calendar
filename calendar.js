js_calendar
// 入力した文字列をリスト化す// 現在の西暦と月を表示させる
const now = new Date();
// 月を取得、月は0から始まるため+1
let month = now.getMonth() + 1;

// オプションで月を指定できるようにする
if (process.argv.includes("-m")) {
  const inx = process.argv.indexOf("-m");

  if (inx + 1 < process.argv.length) {
    month = parseInt(process.argv[inx + 1]);
    try {
      const inputMonth = parseInt(month, 10);

      if (isNaN(month) || month < 1 || month > 12) {
        throw new Error();
      }
    } catch (e) {
      console.error(`${month} is neither a month number (1..12) nor a name`);
      // プログラムをここで終了させる
      process.exit(1);
    }
  }
}

// 年を取得
const year = now.getFullYear();
// カレンダーのタイトルを作成
const calenderTitle = `${month}月 ${year}年`;
// セルの幅を定義
const cell = 4;
// カレンダー全体の幅を計算
const width = cell * 7;

// カレンダーのタイトルを中央揃えで表示
const leftPad = Math.floor((width + calenderTitle.length) / 2);
console.log(calenderTitle.padStart(leftPad).padEnd(width));

// 曜日の配列を定義
const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
let arr = [];
for (let i = 0; i < weekdays.length; i++) {
  const d = weekdays[i];
  arr.push("  " + d);
}
console.log(arr.join(""));

// セル表示を統一する
const formatCell = (v) => {
  if (v === "") {
    return " ".repeat(cell);
  } else {
    return String(v).padStart(cell, " ");
  }
};

// 日付部分を作成するために1~31日の配列を作成する
const days = [];
for (let i = 1; i < 32; i++) {
  days.push(i);
}

// 日付の数を精査するために月のリストを作る
const monthDays31 = [1, 3, 5, 7, 8, 10, 12];
const monthdays30 = [4, 6, 9, 11];

// うるう年を求める関数を定義する
const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

// 日付を表示させるために該当月の最終日を特定しそれまでの日数の配列を返す関数
const getMonthDays = (month, year) => {
  if (monthDays31.includes(month)) {
    return days.slice(0, 31);
  } else if (monthdays30.includes(month)) {
    return days.slice(0, 30);
  } else {
    if (isLeapYear(year)) {
      return days.slice(0, 29);
    } else {
      return days.slice(0, 28);
    }
  }
};

// 対象月の日数を確認するために表示
const monthDays = getMonthDays(month, year);

// 1日を特定しセットバック数を決めるために1日を位置を取得する
const firstDate = new Date(year, month - 1, 1);
// 曜日の数字を求める
const getFirstDayBackNum = firstDate.getDay();

// 日付部分を作成するためにセットバック数分の空白と日付を結合する
const monthStart = Array(getFirstDayBackNum).fill("").concat(monthDays);

// 日付部分を1週間ごとに分割する
const monthStartLineBreak = [];
for (const [i, v] of monthStart.entries()) {
  monthStartLineBreak.push(formatCell(v));
  if ((i + 1) % 7 === 0) monthStartLineBreak.push("\n");
}
console.log(monthStartLineBreak.join(""));
