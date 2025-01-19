import joi from "joi";

const objectId = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const getAccountById = {
	params: joi.object().keys({
		id: objectId.required(),
	}),
};

const deleteAccount = {
	params: joi.object().keys({
		id: objectId.required(),
	}),
};

const createAccount = {
	body: joi.object().keys({
		name: joi.string().required(),
		number: joi.string().required(),
		type: joi.string().valid("new", "active", "inactive", "blocked").optional(),
		status: joi.string().valid("root", "sub").optional(),
	}),
};

const updateAccountById = {
	params: joi.object().keys({
		id: objectId.required(),
	}),
	body: joi.object().keys({
		name: joi.string().optional(),
		number: joi.string().optional(),
		type: joi.string().valid("new", "active", "inactive", "blocked").optional(),
		status: joi.string().valid("root", "sub").optional(),
	}),
};

export { getAccountById, deleteAccount, createAccount, updateAccountById };
