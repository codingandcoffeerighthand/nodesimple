import mongo from "mongoose";

async function checkHealth() {
	return await mongo.connection.db.stats();
}
export { checkHealth };
