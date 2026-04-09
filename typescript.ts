const a: string = "UMC 10th";

let b: {
  id: number;
  name: string;
} = {
  id: 1,
  name: "홍길동",
};

const c: number[] = [1, 2, 3]; // number 배열
const d: string[] = ["U", "M", "C"]; // string 배열
const e: {
  // 객체 배열
  id: number;
  name: string;
}[] = [
  {
    id: 1,
    name: "홍길동",
  },
  {
    id: 2,
    name: "고길동",
  },
];

const f: null[] = [null, null, null];
const g: undefined[] = [undefined, undefined, undefined];

let h: string | number;
// 두 값 모두 대입에 문제가 없습니다.
h = "UMC";
h = 1;

// function 형태
function test1(value: number): number {
  return value;
}
// arrow function 형태
const test2 = (value: number): number => {
  return value;
};

function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const i = getFirst([1, 2, 3]); // i = 1
const j = getFirst(["U", "M", "C"]); // j = "U"

type Challenger = {
  id: number;
  name: string;
};

b: Challenger = {
  id: 1,
  name: "홍길동",
};

interface Challenger2 {
  id: number;
  name: string;
}

const me: Challenger2 = {
  id: 1,
  name: "홍길동",
};
