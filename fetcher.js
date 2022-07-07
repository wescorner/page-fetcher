const request = require("request");
const fs = require("fs");
const readline = require("readline");

const URL = process.argv[2];
const FILE_PATH = process.argv[3];

request(URL, (error, response, body) => {
	if (error) {
		"Error: ", error;
		console.log("INVALID URL!");
		return error;
	} else if (response.statusCode !== 200) {
		return console.log("Status Code: ", response.statusCode);
	} else {
		fs.access(FILE_PATH, (err) =>
			err ? addFile(FILE_PATH, body) : replaceFile(FILE_PATH, body)
		);
	}
});

const addFile = function (path, body) {
	fs.appendFile(path, body, (err) => {
		if (err) console.log(err);
		else
			console.log(`Downloaded and saved ${body.length} bytes to ${FILE_PATH}`);
	});
};

const replaceFile = function (path, body) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	console.log("File already exists. Would you like to override? (y + Enter)");
	rl.on("line", (input) => {
		if (input === "y") {
			fs.writeFile(path, body, (err) => {
				if (err) console.log(err);
				else {
					console.log(
						`Downloaded and saved ${body.length} bytes to ${FILE_PATH}`
					);
					rl.close();
				}
			});
		} else {
			rl.close();
		}
	});
};
