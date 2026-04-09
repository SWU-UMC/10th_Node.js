const fs = require("fs");

console.log("Start");

fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("File:", data.trim());
});

console.log("End");