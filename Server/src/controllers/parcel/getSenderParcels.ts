import { AdvancedResponse } from "../../middlewares/adjustResults";
import asyncHandler from "../../middlewares/asyncHandler";
import { AuthenticatedRequest } from "../../middlewares/authGuard";
import Parcel from "../../models/Parcel";
import BadRequest from "../../utils/errors/BadRequest";

//@desc         see sender's parcels
//@route        GET /api/v1/parcel
//@access       Private (senders)
const getSenderParcels = asyncHandler(async (req, res, next) => {
  const parcels = await Parcel.find({
    sender: (req as AuthenticatedRequest).user._id,
  });
  res.status(200).json({
    success: true,
    data: parcels,
  });
});

export default getSenderParcels;
