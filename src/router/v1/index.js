import { Router } from "express";
import { router as accountsRouter } from "./accounts/index";
import { checkHealth } from "../../helper/checkHealth";
const router = new Router();
router.use("/accounts", accountsRouter);
router.get("/health", async (req, res) => {
	try {
		const health = await checkHealth();
		res.status(200).json({ success: true, data: health });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
});
export { router };
