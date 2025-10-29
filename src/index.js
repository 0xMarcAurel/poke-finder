import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const port = process.env.PORT || 3000;
const URL = "https://pokeapi.co/api/v2/pokemon/";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.render("pages/home", {
    pokemon: null,
    type: null,
    image: null,
    error: null,
  });
});

app.post("/", async (req, res) => {
  const pokemonName = req.body.pokemonName.toLowerCase();

  try {
    const response = await axios.get(`${URL}${pokemonName}`);
    const data = response.data;
    const pokemon = {
      name: data.name,
      type: data.types[0].type.name,
      image: data.sprites.other["official-artwork"].front_default,
    };
    res.render("pages/home", {
      pokemon: pokemon.name,
      type: pokemon.type,
      image: pokemon.image,
      error: null,
    });
  } catch (error) {
    console.log("Error fetching data:", error.message);
    res.status(404);
    res.render("pages/home", {
      pokemon: null,
      type: null,
      image: null,
      error: "Pokemon not found. Please try again!",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
