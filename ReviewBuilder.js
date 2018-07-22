const fs = require("fs");

class ReviewBuilder {
  buildReviewsSync() {
    const products = JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    const reviews = JSON.parse(fs.readFileSync("./data/reviews.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));

    const productsMap = {};
    products.forEach((product) => {
      productsMap[product.id] = product.name;
    });

    const usersMap = {};
    users.forEach((user) => {
      usersMap[user.id] = user.username;
    });

    return reviews.map((review) => {
      const productObj = {
        productName: productsMap[review.productId],
        username: usersMap[review.userId],
        text: review.text,
        rating: review.rating,
      };
      return productObj;
    });
  }

  buildReviewsAsync() {}

  buildReviewsPromises() {}

  buildReviewsAsyncAwait() {}
}

module.exports = ReviewBuilder;
