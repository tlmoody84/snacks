// require("dotenv").config();
// const { createClient } = require("@supabase/supabase-js");const axios = require("axios");
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
// const instance = axios.create({
//     baseURL: process.env.SUPABASE_URL + "/rest/v1",
//     timeout: 1000,
//     headers: { 
//       apikey: process.env.SUPABASE_KEY, 
//       Authorization: "Bearer" + process.env.SUPABASE_KEY },
    
//     });

//   module.exports = instance, supabase;

const axios = require('axios')
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const axiosInstance = axios.create({
    baseURL: process.env.SUPABASE_URL + "/rest/v1",
    timeout: 1000,
    headers: {
        apikey: process.env.SUPABASE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`, // Corrected Authorization header
    },
});

module.exports = supabase, axiosInstance;
