import { Router } from "express";
import { createGroup, getAllGroups, getOpenGroups, applyToGroup, cancelApplication, getGroupById, getGroupsUserAppliedTo } from "../controllers/group.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = Router();

router.get('/groups', authenticate, getAllGroups);
router.get('/groups/applied', authenticate, getGroupsUserAppliedTo);
router.get('/groups/:groupId', authenticate, getGroupById);
router.get('/groups/open', authenticate, getOpenGroups);
router.post('/groups', authenticate, createGroup);
router.post('/groups/apply', authenticate, applyToGroup);
router.post('/groups/cancel', authenticate, cancelApplication);

export default router;