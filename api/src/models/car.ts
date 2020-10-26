import { Schema, model, Document, Model } from "mongoose";

export interface ICar extends Document {
  brand: string;
  modelName: string;
  seats: number;
  mileage: number;
  year: number;
}

export type CarType = {
  _id: string;
  brand: string;
  modelName: string;
  seats: number;
  mileage: number;
  year: number;
  createdAt: string;
  updatedAt: string;
};

const carSchema = new Schema(
  {
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

const CarModel: Model<ICar> = model<ICar>("Car", carSchema);
export default CarModel;
