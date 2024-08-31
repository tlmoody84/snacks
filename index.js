//Import Dotenv
require("dotenv").config();
//Import Express
const express = require("express");
//Import CORS
const cors = require("cors");

//Import axios
const axios = require("axios");
//ImportSupabase instance
const supabase = require("./supabaseInstance");
//Create express app
const app = express();

//Define port
const PORT = 4000;

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

app.use(cors());

app.use(express.json());

app.get("/snacks", (request, response) => {
    response.json(SNACKS);
});


app.use((request, response, next) => {
    console.log(`${request.method} request for ${request.url}`);
    next()
});

app.use(cors());

app.use(express.json());




//Route to get all snacks
app.get("/snacks", async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("snacks")
      .select("*");

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ message: "Snack not found"});
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Route to get a single snack by ID
app.get("/snacks/:id", async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("snacks")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ message: "Snack not found!" });
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

  // Route to add a new snack
app.post("/snacks", async (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;

    if (!name || !description || !price || !category || !inStock === undefined) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    const { data, error } = await supabase
      .from("snacks")
      .insert([{ name, description, price, category, inStock }]);

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    next(error);
  }
});

// Route to update a snack by ID
app.put("/snacks/:id", async (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;

    if (!req.body.price) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    const { data, error } = await supabase
      .from("snacks")
      .update({ name, description, price, category, inStock })
      .eq("id", req.params.id);

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ message: "Snack not found!" });
    }

    res.json(data[0]);
  } catch (error) {
    next(error);
  }
});

  // Route to delete a snack by ID
app.delete("/snacks/:id", async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("snacks")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ message: "Snack not found!" });
    }

    res.json({ message: "Snack deleted successfully!", deletedSnack: data[0] });
  } catch (error) {
    next(error);
  }
});
  
 //Error handler 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`The server   
 is running on http://localhost:${PORT}`);
});