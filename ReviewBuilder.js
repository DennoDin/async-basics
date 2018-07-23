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

  buildReviewsPromises() {
    const productPromise = new Promise((resolve, reject) => {
      const productsMap = {};
      let products;
      fs.readFile("./data/products.json", "utf-8", (error, data) => {
        if (error) reject(error);
        products = JSON.parse(data);
        products.forEach((product) => {
          productsMap[product.id] = product.name;
        });
        resolve(productsMap);
      });
    });
    const userPromise = new Promise((resolve, reject) => {
      let users;
      const usersMap = {};
      fs.readFile("./data/users.json", "utf-8", (error, data) => {
        if (error) reject(error);
        users = JSON.parse(data);
        users.forEach((user) => {
          usersMap[user.id] = user.username;
        });
        resolve(usersMap);
      });
    });
    const reviewsPromise = new Promise((resolve, reject) => {
      let reviews;
      fs.readFile("./data/reviews.json", "utf-8", (error, data) => {
        if (error) reject(error);
        reviews = JSON.parse(data);
        resolve(reviews);
      });
    });

    const promise = Promise.all([
      productPromise,
      userPromise,
      reviewsPromise,
    ]).then(([productsMap, usersMap, reviews]) => {
      return reviews.map((review) => {
        const productObj = {
          productName: productsMap[review.productId],
          username: usersMap[review.userId],
          text: review.text,
          rating: review.rating,
        };
        return productObj;
      });
    });
    return promise;
  }

  buildReviewsAsyncAwait() {}
}

module.exports = ReviewBuilder;
