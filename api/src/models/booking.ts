import { Schema, model, Document, Model } from "mongoose";
import { IUser } from "./user";
import { IRoute } from "./route";
import { IAddress } from "./address";

export interface IBooking extends Document {
  address: IAddress;
  peopleAmount: number;
  extraBaggage: number;
  route: IRoute;
  user: IUser;
}

const bookingSchema = new Schema(
  {
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    peopleAmount: {
      type: Number,
      required: true,
    },
    extraBaggage: {
      type: Number,
      required: false,
    },
    route: {
      type: Schema.Types.ObjectId,
      ref: "Route",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const BookingModel: Model<IBooking> = model<IBooking>("Booking", bookingSchema);
export default BookingModel;
