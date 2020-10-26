import { Schema, Document, model, Model } from "mongoose";
import { IUser } from "./user";
import { IBooking } from "./booking";

export interface IRoute extends Document {
  from: string;
  to: string;
  price: number;
  date: Date;
  amplitude: number;
  creator: IUser;
  bookings: IBooking[];
}

const routeSchema: Schema = new Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  amplitude: { type: Number, required: true },
  price: { type: Number, required: true },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
  car: {
    type: Schema.Types.ObjectId,
    ref: "Car",
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const RouteModel: Model<IRoute> = model<IRoute>("Route", routeSchema);

export default RouteModel;
