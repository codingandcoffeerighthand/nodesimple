import { Router } from "express";
import * as accountsController from "../../../controllers/account";
const router = new Router();

router.get("/", accountsController.getAccounts);
router.get("/:id", accountsController.getAccountById);
router.post("/", accountsController.createAccount);
router.put("/:id", accountsController.updateAccountById);
router.delete("/:id", accountsController.deleteAccount);

export { router };
