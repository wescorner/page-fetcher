const request = require("request");
const fs = require("fs");

const URL = process.argv[2];
const FILE_PATH = process.argv[3];

request(URL, (error, response, body) => {
	console.log("Error: ", error);
	console.log("statusCode: ", response && response.statusCode);
	fs.appendFile(FILE_PATH, body, (err) => {
		if (err) console.log(err);
		else
			console.log(`Downloaded and saved ${body.length} bytes to ${FILE_PATH}`);
	});
});
