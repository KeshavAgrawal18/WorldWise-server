import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
  userid: String,
  cityName: String,
  country: String,
  emoji: String,
  date: String,
  notes: String,
  position: {
    lat: Number,
    lng: Number,
  },
  id: String,
});

const City = new mongoose.model("City", CitySchema);

export default City;
