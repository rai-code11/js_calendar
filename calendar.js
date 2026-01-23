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

// 既存の配列から空白を入れた新しい配列を作るためにmap関数を使用する
const formattedWeekdays = weekdays.map((d) => "  " + d);

console.log(formattedWeekdays.join(""));

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

//対象月の日数を正確に求めるためにDateオブジェクトの次月-前月をして日数を求める
const getMonthDays = (month, year) => {
  const thisMonthDay = new Date(year, month - 1, 1);
  const nextMonthDay = new Date(year, month, 1);

  const diffDays = nextMonthDay - thisMonthDay;

  //ミリ秒を日付に変換する
  const daysCount = diffDays / (24 * 60 * 60 * 1000);
  return days.slice(0, daysCount);
};

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
