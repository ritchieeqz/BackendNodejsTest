module.exports = (sequelize, Sequelize) => {
  const Products = sequelize.define("products", {
    product_id: {
      type: Sequelize.INTEGER,
      primaryKey: 1,
      autoIncrement: 1
    },
    product_no: {
      type: Sequelize.STRING
    },
    product_name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DECIMAL(10, 2)
    },
    description: {
      type: Sequelize.STRING
    }
  }, 
  {
    tableName: 'products',
    timestamps: false
  });

  return Products;
};
