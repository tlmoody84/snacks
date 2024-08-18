const express = require("express");

const cors = require("cors");

const app = express();

const PORT  = 3000;

app.use(express.json());

app.get('/', (request, response) => {
    response.send("Snacks are good");
})


app.use((request, response, next) => {
    console.log(`${request.method} request for ${request.url}`);
    next()
});

app.use(cors());

app.use(express.json());



const SNACKS =  [

    {
        "id": 1,
        "name": "Chips",
        "description": "Crunchy and salty potato chips.",
        "price": 2.99,
        "category": "Salty Snacks",
        "inStock": true
      },
      {
        "id": 2,
        "name": "Chocolate Bar",
        "description": "Rich and creamy milk chocolate bar.",
        "price": 1.49,
        "category": "Sweet Snacks",
        "inStock": true
      },
      {
        "id": 3,
        "name": "Popcorn",
        "description": "Buttery and fluffy popcorn.",
        "price": 3.49,
        "category": "Salty Snacks",
        "inStock": false
      },
      {
        "id": 4,
        "name": "Gummy Bears",
        "description": "Colorful and chewy gummy bears.",
        "price": 2.19,
        "category": "Sweet Snacks",
        "inStock": true
      },
      {
        "id": 5,
        "name": "Pretzels",
        "description": "Crispy and twisted pretzels.",
        "price": 2.79,
        "category": "Salty Snacks",
        "inStock": true
      },
      {
        "id": 6,
        "name": "Granola Bar",
        "description": "Healthy and crunchy granola bar.",
        "price": 1.99,
        "category": "Healthy Snacks",
        "inStock": true
      },
      {
        "id": 7,
        "name": "Fruit Snacks",
        "description": "Sweet and fruity gummy snacks.",
        "price": 2.49,
        "category": "Sweet Snacks",
        "inStock": false
      },
      {
        "id": 8,
        "name": "Nuts Mix",
        "description": "A mix of roasted and salted nuts.",
        "price": 4.99,
        "category": "Healthy Snacks",
        "inStock": true
      },
      {
        "id": 9,
        "name": "Energy Bar",
        "description": "High-protein energy bar.",
        "price": 2.59,
        "category": "Healthy Snacks",
        "inStock": true
      },
      {
        "id": 10,
        "name": "Rice Crackers",
        "description": "Light and crispy rice crackers.",
        "price": 3.19,
        "category": "Healthy Snacks",
        "inStock": false
      }

];

app.get("/snacks", (request, response) => {
  response.json(SNACKS);
})

app.get("/snacks/:id", (request, response, next) => {
    try {
      const foundSnacks = SNACKS.find((value) => {
        return value.id === parseInt(request.params.id);
      });
      if (!foundSnacks) {
        return response.status(404).json({ message: "Snacks are unavailable!" });
      }
      response.json(foundSnacks);
    } catch (error) {
      next(error);
    }
  });

  app.post("/snacks", (request, response, next) => {
    try {
      const { name, description, price, category, inStock } = request.body;
  
      if (!name || !description || !price || !category || !inStock) {
        return response
          .status(400)
          .json({ message: "Missing required fields!!" });
      }
      const newSnacks = {
        id: SNACKS.length + 1,
        name,
        description,
        price,
        category,
        inStock,
      };
      SNACKS.push(newSnacks);
    console.log(SNACKS);

    response.status(201).json(newSnacks);
  } catch (error) {
    next(error);
  }
});


app.put("/snacks/:id", (request, response, next) => {
    try {
      const foundSnacks = SNACKS.find((value) => {
        return value.id === parseInt(request.params.id);
      });
  
      const { name, description, price, category, inStock } = request.body;
        if (!name || !description || !price || !category || !inStock) {
        return response
          .status(400)
          .json({ message: "Missing required fields!!" });
      }
  
      foundSnacks.name = name;
      foundSnacks.description = description;
      foundSnacks.price = price;
      foundSnacks.category = category;
      foundSnacks.inStock = inStock;
  
      response.json(foundSnacks);
  
      console.log(SNACKS);
    } catch (error) {
      next(error);
    }
  });
  
  
  app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).json({
      error: "Something broke!",
      errorStack: error.stack,
      errorMessage: error.message,
    });
  });
  
  app.use((request, response, next) => {
    response.status(404).json({
      error:
        "Resource not found. Are you sure you're looking in the right place?",
    });
  });

  app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
  });