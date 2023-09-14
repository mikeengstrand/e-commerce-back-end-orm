const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');



// Hint: Be sure to look at the mini-project code for syntax help and use your model's column definitions to figure out what req.body will be for POST and PUT routes!

// The `/api/products` endpoint

  // find all products
  // be sure to include its associated Category and Tag data
  router.get('/', async (req, res) => {
    try {
      const ProductData = await Product.findAll({
        include: [{model: Category }, {model: Tag }]
      });
      res.status(200).json(ProductData)
    }catch (err) {
      res.status(500).json(err);
    }
  });


  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  router.get('/:id', async (req, res) => {
    try {
      const ProductData = await Product.findByPk(req.params.id, {
        include: [{ model: Category }, { model: Tag }],
      });
  
      if (!ProductData) {
        res.status(404).json({ message: 'No category matches this ID!' });
        return;
      }
      res.status(200).json(ProductData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// create new product
// router.post('/', (req, res) => {
//   /* req.body should look like this...
//     {
//       product_name: "Basketball",
//       price: 200.00,
//       stock: 3,
//       tagIds: [1, 2, 3, 4]
//     }
//   */
// const newProduct = {
//   product_name: "",
//       price: 30.99,
//       stock: 10,
//       tagIds: 1
// }
//   Product.create(newProduct)
//     .then((product) => {
//       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//       if (req.body.tagIds.length) {
//         const productTagIdArr = newProduct.tagIds.map((tag_id) => {
//           return {
//             product_id: product.id,
//             tag_id,
//           };
//         });
//         return ProductTag.bulkCreate(productTagIdArr);
//       }
//       // if no product tags, just respond
//       res.status(200).json(product);
//     })
//     .then((productTagIds) => res.status(200).json(productTagIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((ProductData) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tag_id) {
        const ProductTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: Product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(ProductTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(ProductData);
    })
    .then((ProductTagIds) => res.status(200).json(ProductTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});





// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});
  // delete one product by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const ProductData = await Product.destroy({
        where: {
          id: req.params.id
        }
      });
      if(!ProductData) {
        res.status(404).json({message: 'No reader found with that id!'});
        return;
      }
      res.status(200).json(ProductData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
