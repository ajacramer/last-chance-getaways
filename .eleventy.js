module.exports = function (eleventyConfig) {
    return {
      dir: {
        input: "src",
        output: "_site"
      }
    };
  };
  
  module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets");
  
    return {
      dir: {
        input: "src",
        output: "_site"
      }
    };
  };
  