const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  try {
    // Validate the request body to ensure it contains the required fields
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    // Create a new Category instance with validated data
    const newCat = new Category({
      name,
    });

    // Save the new category to the database
    const savedCat = await newCat.save();

    // Respond with the saved category data
    res.status(201).json(savedCat);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/", async (req, res) => {
   try { 
    const cats=await Category.find();
    res.status(200).json(cats)
    
   } catch (err) {
    res.status(500).json(err);
   }
  });

module.exports = router;
