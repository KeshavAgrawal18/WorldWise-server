import express from "express";
import {
  createNewCity,
  deleteCity,
  getAllCities,
  getCityById,
} from "../Controllers/cityController.js";
import authenticationMiddleware from "../middlewares/authenticationMiddlewares.js";

const router = express.Router();

router.get("/cities/userId/:userId", getAllCities);

router.get("/cities/userId/:userId/id/:id", getCityById);

router.post("/newCity", authenticationMiddleware, createNewCity);

router.delete("/city/delete", authenticationMiddleware, deleteCity);

export default router;
