import { Router } from "express";
import { authGuard, authorize } from "../../middlewares/authGuard";
import { Roles } from "../../config/constants";
import addParcel from "../../controllers/parcel/addParcel";
import getSenderParcels from "../../controllers/parcel/getSenderParcels";
import adjustResults from "../../middlewares/adjustResults";
import Parcel from "../../models/Parcel";
import updateParcel from "../../controllers/parcel/updateParcel";
import getAllParcels from "../../controllers/parcel/getAllParcels";

const ParcelsRouter = Router();

ParcelsRouter.route("/senders")
  .all(authGuard, authorize(Roles.SENDER))
  .post(addParcel)
  .get(getSenderParcels);

ParcelsRouter.route("/bikers")
  .all(authGuard, authorize(Roles.BIKER))
  .put(updateParcel)
  .get(adjustResults(Parcel), getAllParcels);

ParcelsRouter.route("/bikers/:id").put(
  authGuard,
  authorize(Roles.BIKER),
  updateParcel
);

export default ParcelsRouter;
