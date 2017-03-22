'use strict';

module.exports = prices => {
  return prices.reduce((sum, price) => sum += price ) / prices.length;
}
