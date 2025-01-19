function mapToAccountResponse(account) {
	const { id, name, number, type, status } = account;
	return {
		id,
		name,
		number,
		type,
		status,
	};
}

export { mapToAccountResponse };
