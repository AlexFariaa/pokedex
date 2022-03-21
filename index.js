require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const pokedex = [
    {
        id: 1,
        nome: "Bulbasaur",
        descricao: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
        tipo: "grass",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
    },
    {
        id: 2,
        nome: "Charmander",
        descricao: "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
        tipo: "fire",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
    },
    {
        id: 3,
        nome: "Squirtle",
        descricao: "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
        tipo: "water",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png"
    }
]

//rotas

let pokemon = undefined

app.get("/", (req, res) => {
  res.render("index", {pokedex, pokemon});
});

app.get("/home", (req, res) => {
  res.send("pagina inicial");
});

app.post("/create", (req, res)=>{
    const pokemon = req.body;
    pokemon.id = pokedex.length + 1;
    pokedex.push(pokemon);
    console.log(pokemon)
    
    res.redirect("/#cards");
});

app.get("/detalhes/:id", (req, res) => {
    const id = +req.params.id
    pokemon = pokedex.find(pokemon => pokemon.id == id);
    res.redirect("/#cadastro");
})

app.post("/update/:id", (req, res)=>{
    const id = +req.params.id - 1

    const newpokemon = req.body
    newpokemon.id = id + 1
    pokedex[id] = newpokemon;

    pokemon = undefined
    res.redirect("/#cards");
});

app.get("/delete/:id", (req, res) =>{
    const id = +req.params.id - 1

    delete pokedex[id]

    res.redirect("/#cards")
})

app.listen(port, () =>
  console.log(`Servidor rodando em https://localhost:${port}`)
);
