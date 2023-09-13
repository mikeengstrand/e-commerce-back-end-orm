const router = require('express').Router();
const { Category, Product } = require('../../models');


// Hint: Be sure to look at the mini-project code for syntax help and use your model's column definitions to figure out what req.body will be for POST and PUT routes!

// The `/api/categories` endpoint

// find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const CategoryData = await Category.findAll({
      include: [{model: Product }]
    });
    res.status(200).json(CategoryData)
  }catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
