import { Schema, Document, model, Model } from "mongoose";

export interface IRoute extends Document {
  from: string;
  to: string;
  price: number;
  date: Date;
  places: number;
}

const routeSchema: Schema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  places: { type: Number, required: true },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const RouteModel: Model<IRoute> = model<IRoute>("Route", routeSchema);

export default RouteModel;
