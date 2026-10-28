const express = require("express");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const app = express();
const cors = require("cors");
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const supabase = createClient(
   process.env.SUPABASE_URL,
   process.env.SUPABASE_SECRET_KEY
)

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.post("/students", async (req, res) => {
    const { name, email, password, department } = req.body;
    
    const { data, error } = await supabase
        .from("students")
        .insert({
            name: name,
            email: email,
            password: password,
            department: department
         })
        .select("*");
        if (error) {
            return res.status(400).json({ 
                message: "Error inserting student",
                error: error.message
            });
        }
        res.status(201).json({ 
            message: "Student inserted successfully",
            data: data
        });
})