import { Schema, model, Document, Model } from "mongoose";
import { IUser } from "./user";
import { IBooking } from "./booking";

export interface IAddress extends Document {
  city: string;
  street: string;
  number: string;
}

const addressSchema = new Schema(
  {
    city: {
      type: Schema.Types.String,
      required: true,
    },
    street: {
      type: Schema.Types.String,
      required: true,
    },
    number: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

const AddressModel: Model<IAddress> = model<IAddress>("Address", addressSchema);
export default AddressModel;
