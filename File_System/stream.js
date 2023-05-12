const fs = require("fs");
const path = require("path");

const rs = fs.createReadStream(
  path.join(__dirname, "new-files", "lorem.txt"),
  { encoding: "utf8" }
);

const ws = fs.createWriteStream(
  path.join(__dirname, "new-files", "stream.txt")
);

rs.on('data', (chunkData) => {
    ws.write(chunkData)
    console.log('chunked data streamed succcessfully');
});