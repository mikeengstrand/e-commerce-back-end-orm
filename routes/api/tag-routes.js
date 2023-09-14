const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// Hint: Be sure to look at the mini-project code for syntax help and use your model's column definitions to figure out what req.body will be for POST and PUT routes!
// The `/api/tags` endpoint


  // find all tags
  // be sure to include its associated Product data
  router.get('/', async (req, res) => {
    try {
      const TagtData = await Tag.findAll({
        include: [{model: Product }]
      });
      res.status(200).json(TagtData)
    }catch (err) {
      res.status(500).json(err);
    }
  });

// find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', async (req, res) => {
    try {
      const TagData = await Tag.findByPk(req.params.id, {
        include: [{ model: Product }],
      });
  
      if (!TagData) {
        res.status(404).json({ message: 'No tag matches this ID!' });
        return;
      }
      res.status(200).json(TagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  // create a new tag
  router.post('/', async (req, res) => {
    try {
      const TagData = await Tag.create(req.body);
      res.status(200).json(TagData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((TagData) => {
    res.status(200).json(TagData);
  }) .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  const DeletedData = Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(DeletedTag => res.status(200).json(DeletedTag))
    .catch((err) => {
      res.status(500).json(err)
    })
});
module.exports = router;
