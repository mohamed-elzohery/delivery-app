import { Router } from "express";
import login from "../../controllers/auth/login";
import Biker from "../../models/Biker";
import Sender from "../../models/Sender";

const AuthRouter = Router();

AuthRouter.post("/bikers/login", login(Biker));
AuthRouter.post("/login", login(Sender));

export default AuthRouter;
