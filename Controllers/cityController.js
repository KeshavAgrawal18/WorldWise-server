import City from "../Models/CityModel.js";
import { randomNumGenerator } from "../utils/randomGenerators.js";

const getAllCities = async (req, res) => {
  const { userId } = req.params;
  City.find({ userId })
    .then((results) => {
      if (results.length === 0) {
        res.send(results);
        return;
      } else {
        res.send(results[0].data);
        return;
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
      return;
    });
};

const getCityById = (req, res) => {
  const { id, userId } = req.params;
  City.find({ userId })
    .then((result) => {
      const city = result[0].data.find((o) => o.id === id);
      res.send(city);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

const createNewCity = (req, res) => {
  try {
    let cityId = randomNumGenerator(8);

    const { newCity, userId } = req.body;
    City.exists({ userId }).then((resultId) => {
      if (resultId) {
        City.updateOne(
          { userId },
          { $push: { data: { ...newCity, id: cityId } } }
        )
          .then((result) => {
            res.send({ id: cityId });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send(err);
          });
      } else {
        const new_City = new City({
          userId: userId,
          data: [{ ...newCity, id: cityId }],
        });
        new_City.save();
        res.status(200).json("New City Created succesfully");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const deleteCity = (req, res) => {
  const { id, cityName } = req.body;
  City.deleteOne({ id: id, cityName: cityName })
    .then(function () {
      res.status(200).json("city deleted successfully");
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};

export { getAllCities, getCityById, createNewCity, deleteCity };
