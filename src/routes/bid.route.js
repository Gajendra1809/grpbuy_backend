import { Router } from "express";
import { createBid, getBidByGroupId, updateBid, getBidByBidderId, deleteBid } from "../controllers/bid.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = Router();

router.get('/bids/applied', authenticate, getBidByBidderId);
router.get('/bids/:groupId', authenticate, getBidByGroupId);
router.post('/bids', authenticate, createBid);
router.delete('/bids/:bidId', authenticate, deleteBid);
router.put('/bids/:bidId', authenticate, updateBid);

export default router;