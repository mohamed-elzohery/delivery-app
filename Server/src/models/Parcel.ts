import { Schema, model, Document, Types } from "mongoose";

export enum ParcelStatus {
  PENDING = "pending",
  PICKED_UP = "picked up",
  DELIVERED = "delivered",
}

export interface ParcelI extends Document {
  sender: Types.ObjectId;
  pickupAddress: string;
  dropoffAddress: string;
  status: ParcelStatus;
  pickupTimestamp?: Date;
  deliveryTimestamp?: Date;
  assignedBiker?: Types.ObjectId;
}

const ParcelSchema = new Schema<ParcelI>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "Sender",
    required: [true, "Sender ID is required"],
  },
  pickupAddress: {
    type: String,
    required: [true, "Pickup address is required"],
  },
  dropoffAddress: {
    type: String,
    required: [true, "Dropoff address is required"],
  },
  status: {
    type: String,
    enum: Object.values(ParcelStatus),
    default: ParcelStatus.PENDING,
  },
  pickupTimestamp: {
    type: Date,
  },
  deliveryTimestamp: {
    type: Date,
  },
  assignedBiker: {
    type: Types.ObjectId,
    ref: "Biker",
  },
});

const Parcel = model<ParcelI>("Parcel", ParcelSchema);

export default Parcel;
