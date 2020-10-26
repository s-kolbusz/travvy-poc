import CarModel, { CarType, ICar } from "../models/car";
import { dateToString } from "../helpers/date";

export type CarPromise = Promise<CarType>;
export type AllCarsPromise = Promise<CarType[]>;

const carValueMapper = (car: ICar): CarType => {
  const fullCar: any = { ...car };

  return {
    _id: car.id,
    brand: car.brand,
    modelName: car.modelName,
    seats: car.seats,
    mileage: car.mileage,
    year: car.year,
    createdAt: dateToString(fullCar._doc.createdAt),
    updatedAt: dateToString(fullCar._doc.updatedAt),
  };
};

export const findAllCars: () => AllCarsPromise = async () => {
  try {
    const cars = await CarModel.find();
    return cars.map((car) => {
      return carValueMapper(car);
    });
  } catch (e) {
    throw e;
  }
};

export const findAllCarsByIds: (ids: string[]) => AllCarsPromise = async (
  ids: string[]
) => {
  try {
    const cars = await CarModel.find({ _id: { $in: ids } });
    if (cars) {
      return cars.map((car) => {
        return carValueMapper(car);
      });
    }
    return [];
  } catch (e) {
    throw e;
  }
};

export const findCarById: (id: string) => CarPromise = async (id: string) => {
  try {
    const car = await CarModel.findById(id);
    if (!car) throw new Error("There is no car for this id!");
    return carValueMapper(car);
  } catch (e) {
    throw e;
  }
};
