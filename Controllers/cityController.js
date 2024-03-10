import City from "../Models/CityModel.js";

const getAllCities = async (req, res) => {
  City.find()
    .then((results) => {
      res.send(results);
      return;
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
      return;
    });
};

const getCityById = (req, res) => {
  const { id } = req.params;
  City.find({ id: id })
    .then((result) => {
      res.send(result[0]);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

const createNewCity = (req, res) => {
  try {
    let id = randomNumGenerator(8);

    const { newCity } = req.body;
    const new_City = new City({ ...newCity, id: id });
    new_City.save();
    res.status(200).json("New City Created succesfully");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const deleteCity = (req, res) => {
  const { id, cityName } = req.body;
  City.deleteOne({ id: id })
    .then(function () {
      res.status(200).json("city deleted successfully");
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};

export { getAllCities, getCityById, createNewCity, deleteCity };
