import asyncHandler from "../../middlewares/asyncHandler";
import { AuthenticatedRequest } from "../../middlewares/authGuard";
import { Types } from "mongoose"; // Import Types from mongoose package
import Parcel from "../../models/Parcel";
import BadRequest from "../../utils/errors/BadRequest";

//@desc         update parcel
//@route        PUT /api/v1/parcel/bikers/:id
//@access       Private (bikers)
const updateParcel = asyncHandler(async (req, res, next) => {
  const { status, pickupTimestamp, dropoffTimestamp } = req.body;
  console.log(req.body, "body were");
  const id = req.params.id;
  const bikerId = (req as AuthenticatedRequest).user
    ._id as unknown as Types.ObjectId;
  const parcel = await Parcel.findById(id);
  if (!parcel) {
    return next(new BadRequest(`Parcel not found with ID ${id}`));
  }

  // Check if the parcel is already picked by another biker
  if (
    parcel.assignedBiker &&
    parcel.assignedBiker.toString() !== bikerId.toString()
  ) {
    return next(new BadRequest("Parcel already picked by another biker"));
  }

  parcel.status = status;
  parcel.pickupTimestamp = pickupTimestamp;
  parcel.dropoffTimestamp = dropoffTimestamp;
  parcel.assignedBiker = bikerId;

  console.log(parcel);

  await parcel.save();

  res.status(201).json({
    success: true,
    data: parcel,
  });
});

export default updateParcel;
