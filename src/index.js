const express = require('express');
const {v4: uuidv4} = require('uuid')

const app = express();

app.use(express.json());

const costumers  = [];

app.post('/account', (request, response)=>{
  const {cpf, name} = request.body;

  const costumerAlreadyExists = costumers.some(
    (costumer)=> costumer.cpf === cpf
    );

  if (costumerAlreadyExists){
    return response.status(400).json({error: "Costumer already exists!"});
  }


  costumers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  })

  return response.status(201).send();
});

app.get("/statement/:cpf", (request, response) => {
  const {cpf} = request.params;

  const costumer = costumers.find(costumer => costumer.cpf === cpf );
  return response.json(costumer.statement)
});


app.listen(3333);