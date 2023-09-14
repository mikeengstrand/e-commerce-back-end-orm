const router = require('express').Router();
const { Category, Product } = require('../../models');

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


  // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No category matches this ID!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


  // create a new category
  router.post('/', async (req, res) => {
    try {
      const CategoryData = await Category.create(req.body);
      res.status(200).json(CategoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


// update a category by its `id` value
router.put('/:id', async (req, res) => {
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((CategoryData) => {
    res.status(200).json(CategoryData);
  }) .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});


// delete a category by its `id` value  
router.delete('/:id', async (req, res) => {
  const CategoryData = Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(CategoryData => res.status(200).json(CategoryData))
    .catch((err) => {
      res.status(500).json(err)
    })
});


module.exports = router;
