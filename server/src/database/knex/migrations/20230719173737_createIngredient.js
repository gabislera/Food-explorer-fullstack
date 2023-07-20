exports.up = knex => knex.schema.createTable("ingredients", table => {
  table.increments("id");
  table.text("name");

  table.integer("product_id").references("id").inTable("products").onDelete("CASCADE");
  table.integer("user_id").references("id").inTable("users");
});

exports.down = knex => knex.schema.dropTable("ingredients");