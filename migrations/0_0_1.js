module.exports = function (migration) {
  const product = migration.editContentType('product')

  product.createField('stock')
    .name('Stock')
    .type('Integer')
}