console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");

/* 결과
A -> C -> B */
