import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;
const URL = "https://pokeapi.co/api/v2/pokemon/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { pokemon: null, type: null, error: null });
});

app.post("/", async (req, res) => {
  const pokemonName = req.body.pokemonName.toLowerCase();

  try {
    const response = await axios.get(`${URL}${pokemonName}`);
    const data = response.data;
    const pokemon = {
      name: data.name,
      type: data.types[0].type.name,
    };
    res.render("index", {
      pokemon: pokemon.name,
      type: pokemon.type,
      error: null,
    });
  } catch (error) {
    console.log("Error fetching data:", error.message);
    res.status(404);
    res.render("index", {
      pokemon: null,
      type: null,
      error: "Pokemon not found. Please try again!",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
