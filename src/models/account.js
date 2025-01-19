import mongoose from "mongoose";
const AccountSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		number: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ["root", "sub"],
			default: "sub",
		},
		status: {
			type: String,
			enum: ["active", "inactive", "new", "blocked"],
			default: "new",
		},
		createAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
		},
	},
	{
		optimisticConcurrency: true,
	},
);
const Account = mongoose.model("Account", AccountSchema);

export { Account };
