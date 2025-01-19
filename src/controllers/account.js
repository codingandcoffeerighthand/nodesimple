import { mapToAccountResponse } from "../helper/mapAccountResponse";
import * as accountService from "../services/account";

const getAccountById = async (req, res) => {
	const { id } = req.params;
	const result = await accountService.getAccountById(id);
	if (result) {
		res.status(200).json({ success: true, data: mapToAccountResponse(result) });
	} else {
		res.status(404).json({ success: false, message: "account not found" });
	}
};

const getAccounts = async (req, res) => {
	const result = await accountService.getAllAccounts();

	res.status(200).json({
		success: true,
		data: result.map(mapToAccountResponse),
	});
};

const createAccount = async (req, res) => {
	const { name, number, type, status } = req.body;
	const result = await accountService.createAccount(name, number, type, status);
	res.status(201).json({ success: true, data: mapToAccountResponse(result) });
};

const deleteAccount = async (req, res) => {
	const { id } = req.params;
	const result = await accountService.deleteAccount(id);
	if (result) {
		res.status(200).json({ success: true });
	} else {
		res.status(404).json({ success: false, message: "account not found" });
	}
};

const updateAccountById = async (req, res) => {
	const { id } = req.params;
	const { name, number, type, status } = req.body;
	const result = await accountService.updateAccountById(id, {
		name,
		number,
		type,
		status,
	});
	if (result.error) {
		switch (result.code) {
			case accountService.errorCodes.NO_VALID_DATA_TO_UPDATE:
				res.status(400).json({ success: false, message: result.error });
				return;
			case accountService.errorCodes.INVALID_STATUS_CODE:
				res.status(400).json({ success: false, message: result.error });
				return;
			case accountService.errorCodes.INVALID_TYPE_CODE:
				res.status(400).json({ success: false, message: result.error });
				return;
			case accountService.errorCodes.INVALID_ACCOUNT:
				res.status(400).json({ success: false, message: result.error });
				return;
			case accountService.errorCodes.INVALID_STATE_TRANSITION:
				res.status(400).json({ success: false, message: result.error });
				return;
			case accountService.errorCodes.INVALID_TYPE_TRANSITION:
				res.status(400).json({ success: false, message: result.error });
				return;
			default:
				res
					.status(500)
					.json({ success: false, message: "internal server error" });
				return;
		}
	}
	res.json(200).json({ success: true, data: mapToAccountResponse(result) });
};

export {
	getAccounts,
	getAccountById,
	createAccount,
	deleteAccount,
	updateAccountById,
};
