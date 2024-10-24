import { Router } from "express";
import {
  handleCallRequest,
  handleSmsRequest,
} from "../controllers/twilioController.js";

const router = Router();

router.post("/sms", handleSmsRequest);
router.post("/call", handleCallRequest);

export default router;
