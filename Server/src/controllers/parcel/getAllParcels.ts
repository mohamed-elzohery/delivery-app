import { AdvancedResponse } from "../../middlewares/adjustResults";
import asyncHandler from "../../middlewares/asyncHandler";
import { AuthenticatedRequest } from "../../middlewares/authGuard";
import Parcel from "../../models/Parcel";
import BadRequest from "../../utils/errors/BadRequest";

//@desc         see all parcels
//@route        GET /api/v1/parcel/bikers
//@access       Private (bikers)
const getAllParcels = asyncHandler(async (req, res, next) => {
  const parcels = await Parcel.find({
    $or: [
      { assignedBiker: null },
      { assignedBiker: { $ne: (req as AuthenticatedRequest).user._id } },
    ],
  });

  res.status(200).json(parcels);
});

export default getAllParcels;
