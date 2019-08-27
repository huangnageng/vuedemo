const isPro = Object.is(process.env.NODE_ENV, "production");
console.log(process.env.NODE_ENV);
module.exports = {
  baseUrl: isPro ? "http://112.74.161.143/" : "api/"
};
