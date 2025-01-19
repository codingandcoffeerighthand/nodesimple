import { Account } from "../models/account";

function getAccountById(id) {
	return Account.findById(id);
}

function getAllAccounts() {
	return Account.find({});
}

function createAccount(name, number, type, status) {
	return Account.create({ name, number, type, status });
}

async function deleteAccount(id) {
	const deletedAccount = await Account.findByIdAndDelete(id);
	return !!deletedAccount;
}

const availableAccountStatusesForUpdate = {
	new: ["active", "blocked"],
	active: ["inactive", "blocked"],
	inactive: ["active"],
	blocked: ["active"],
};

const avaiableAccountTypesForUpdate = {
	root: ["sub"],
	sub: ["root"],
};
const errorCodes = {
	NO_VALID_DATA_TO_UPDATE: 0,
	INVALID_STATUS_CODE: 1,
	INVALID_TYPE_CODE: 2,
	INVALID_ACCOUNT: 3,
	INVALID_STATE_TRANSITION: 4,
	INVALID_TYPE_TRANSITION: 5,
};

async function updateAccountById(id, { name, number, type, status }) {
	if (!name && !number && !type && !status) {
		return {
			code: NO_VALID_DATA_TO_UPDATE,
			error: "no valid data to update",
		};
	}

	if (status && !(status in availableAccountStatusesForUpdate)) {
		return {
			code: INVALID_STATUS_CODE,
			error: "invalid status code",
		};
	}

	if (type && !(type in avaiableAccountTypesForUpdate)) {
		return {
			code: INVALID_TYPE_CODE,
			error: "invalid type code",
		};
	}

	const account = await Account.findById(id);
	if (!account) {
		return {
			code: INVALID_ACCOUNT,
			error: "invalid account",
		};
	}

	if (status) {
		const validTransitions = availableAccountStatusesForUpdate[account.status];
		if (!validTransitions.includes(status)) {
			return {
				code: INVALID_STATE_TRANSITION,
				error: "invalid state transition",
			};
		}
	}

	if (type) {
		const validTransitions = avaiableAccountTypesForUpdate[account.type];
		if (!validTransitions.includes(type)) {
			return {
				code: INVALID_TYPE_TRANSITION,
				error: "invalid type transition",
			};
		}
	}
	account.name = name ?? account.name;
	account.number = number ?? account.number;
	account.type = type ?? account.type;
	account.status = status ?? account.status;
	account.updatedAt = new Date();
	await account.save();
	return account;
}

export {
	getAccountById,
	getAllAccounts,
	createAccount,
	deleteAccount,
	updateAccountById,
	errorCodes,
};
