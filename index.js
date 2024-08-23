const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

const allPokemon = [];

function getPokemonById(id) {
  return allPokemon.find(pokemon => pokemon.id === Number(id));
}

app.get('/', (req, res) => {
  res.send('HELO MA FREN DIS IS MA POKEMON EI PI AI');
});

app.get('/pokemon', (req, res) => {
  res.json(allPokemon);
});

app.get('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  const pokemon = getPokemonById(id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send('Pokémon no encontrado');
  }
});

app.post('/pokemon', (req, res) => {
  const newPokemon = req.body;
  if (newPokemon && newPokemon.id) {
    const existingPokemon = getPokemonById(newPokemon.id);
    if (existingPokemon) {
      res.status(400).send('Pokémon con ese ID ya existe');
    } else {
      allPokemon.push(newPokemon);
      res.status(201).send('Pokémon creado');
    }
  } else {
    res.status(400).send('Datos del Pokémon inválidos');
  }
});

app.put('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  const updatedPokemon = req.body;
  const index = allPokemon.findIndex(pokemon => pokemon.id == Number(id));

  if (index !== -1) {
    allPokemon[index] = { id: Number(id), ...updatedPokemon };
    res.send('Pokémon actualizado');
  } else {
    res.status(404).send('Pokémon no encontrado');
  }
});

app.delete('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  const index = allPokemon.findIndex(pokemon => pokemon.id == Number(id));

  if (index !== -1) {
    allPokemon.splice(index, 1);
    res.send('Pokémon eliminado');
  } else {
    res.status(404).send('Pokémon no encontrado');
  }
});

app.listen(port, () => {
  console.log(`POKEMON-CRUD listening on port ${port}`);
});
