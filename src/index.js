import { connect, disconnect } from "./db";
import { createConfig } from "./config/config";
import { app } from "./app";

async function start() {
	const config = createConfig();

	connect(config);
	const server = app.listen(config.port, () => {
		console.log(`Listening on port ${config.port}`);
	});

	const closeServer = () => {
		disconnect();
		if (server) {
			server.close(() => {
				console.log("Server closed");
				process.exit();
			});
		} else {
			process.exit();
		}
	};
	const unexceptedError = (err) => {
		console.log("unexceptedError", err);
		closeServer();
	};

	process.on("uncaughtException", unexceptedError);
	process.on("unhandledRejection", unexceptedError);
}

start();
