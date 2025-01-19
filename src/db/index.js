import mongoose from "mongoose";

let mongoUrl = "";

async function connect({ mongo: { url } }) {
	mongoUrl = url;
	try {
		await mongoose.connect(url);
	} catch (err) {
		setTimeout(connect, 8000);
	}
}
const dbConnection = mongoose.connection;

function disconnect() {
	dbConnection.removeAllListeners();
	return mongoose.disconnect();
}

export { connect, disconnect };
