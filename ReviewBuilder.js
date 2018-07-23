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

  buildReviewsAsync(callback) {
    let products;
    let reviews;
    let users;
    const productsMap = {};
    const usersMap = {};

    fs.readFile("./data/products.json", "utf-8", (error, data) => {
      if (error) throw error;
      products = JSON.parse(data);
      products.forEach((product) => {
        productsMap[product.id] = product.name;
      });
    });

    fs.readFile("./data/users.json", "utf-8", (error, data) => {
      if (error) throw error;
      users = JSON.parse(data);
      users.forEach((user) => {
        usersMap[user.id] = user.username;
      });
    });

    fs.readFile("./data/reviews.json", "utf-8", (error, data) => {
      if (error) throw error;
      reviews = JSON.parse(data);
      const result = reviews.map((review) => {
        const productObj = {
          productName: productsMap[review.productId],
          username: usersMap[review.userId],
          text: review.text,
          rating: review.rating,
        };
        return productObj;
      });
      return callback(result);
    });
  }

  buildReviewsPromises() {}

  buildReviewsAsyncAwait() {}
}

module.exports = ReviewBuilder;
