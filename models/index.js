// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category / foregn is category_id per on product-seed
Product.belongsTo(Category, {
  foreignKey: 'Category_id',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'Product_id',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: Tag,
    model: ProductTag,
    unique: false
  }
});

// Tags belongToMany Products (through ProductTag) prodct tag has foreigh key of tag_id
Tag.belongsToMany(Product, {
  through: {
    model: Product,
    model: ProductTag,
    unique: false
  }
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
