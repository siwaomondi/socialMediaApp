import userCtrl from "../controllers/user.controller";

const express = require("express");
const router = express.Router();

router
    .route("/api/users")
    .get(userCtrl.list)
    .post(userCtrl.create);
router
    .route("/api/users/:userId")
    .get(userCtrl.read)
    .put(userCtrl.create)
    .delete(userCtrl.remove);


router.param("userId",userCtrl.userById)
export default router