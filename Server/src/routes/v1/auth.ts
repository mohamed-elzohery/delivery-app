import { Router } from "express";
import login from "../../controllers/auth/login";
import Biker from "../../models/Biker";
import Sender from "../../models/Sender";
import verifyToken from "../../controllers/auth/verifyToken";

const AuthRouter = Router();

AuthRouter.post("/bikers/login", login(Biker));
AuthRouter.get("/verifyToken", verifyToken);
AuthRouter.post("/senders/login", login(Sender));

export default AuthRouter;
