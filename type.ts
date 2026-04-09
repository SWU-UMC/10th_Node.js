let a: string = "UMC 10th";

let b: {
  id: number;
  name: string;
} = {
  id: 1,
  name: "홍길동",
};

let f: null[] = [null, null, null];
let g: undefined[] = [undefined, undefined, undefined];

let h: string | number;
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

const i = getFirst([1, 2, 3]); // i는 number
const j = getFirst(["U", "M", "C"]); // j는 string

type ChallengerType = {
  id: number;
  name: string;
};

interface Challenger {
  id: number;
  name: string;
}

const me: Challenger = {
  id: 1,
  name: "홍길동",
};