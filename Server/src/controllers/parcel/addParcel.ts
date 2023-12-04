import asyncHandler from "../../middlewares/asyncHandler";
import { AuthenticatedRequest } from "../../middlewares/authGuard";
import Parcel from "../../models/Parcel";
import BadRequest from "../../utils/errors/BadRequest";

//@desc         add new parcel
//@route        POST /api/v1/parcel/senders
//@access       Private (senders)
const addParcel = asyncHandler(async (req, res, next) => {
  const { pickupAddress, dropoffAddress } = req.body;
  if (!(pickupAddress && dropoffAddress)) {
    return next(
      new BadRequest("Please enter pickup address and dropoff address.")
    );
  }

  const parcel = await Parcel.create({
    pickupAddress,
    dropoffAddress,
    sender: (req as AuthenticatedRequest).user._id,
  });
  res.status(201).json({
    success: true,
    data: parcel,
  });
});

export default addParcel;
