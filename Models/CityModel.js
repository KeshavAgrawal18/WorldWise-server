import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
  userId: String,
  data: [
    {
      cityName: String,
      country: String,
      emoji: String,
      date: {
        type: Date,
        default: Date.now(),
      },
      notes: String,
      position: {
        lat: Number,
        lng: Number,
      },
      id: String,
    },
  ],
});

const City = new mongoose.model("City", CitySchema);

export default City;
