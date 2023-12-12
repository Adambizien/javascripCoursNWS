import express from 'express';
import { simpleRandomNumber } from './random/simpleRandomNumber.js';
import { pokemons } from './pokemon/data.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port =  process.env.PORT;

app.get('/', (req, res) => {
    res.send('coucou');
});
app.get('/random', async (req, res) => {
    try {
        const randomNumber = await simpleRandomNumber();
        res.send(`Your random number is ${randomNumber}`);
    } catch (error) {
        res.status(500).send('Error Server');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

app.get('/pokemon/:id', (req, res) => {
    const id = req.params.id;
    const pokemon = pokemons.find((p) => p.id === Number(id));
    if (pokemon) {
        res.send(pokemon['name'].toString()+" ("+pokemon['types'].toString()+")");
    } else {
        res.status(404).send(`Pokemon with id ${id} not found`);
    }
});


//npm run dev puis va dans http://localhost:3001/
//npm run dev puis va dans http://localhost:3001/random