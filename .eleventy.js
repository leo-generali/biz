module.exports = function(eleventyConfig) {
  eleventyConfig.addTransform('htmlmin', require('./src/scripts/html-minify'));
  eleventyConfig.addPassthroughCopy('./src/img');
  eleventyConfig.addPassthroughCopy('favicon.ico');

  return {
    dir: {
      input: 'src',
      output: '_site'
    }
  };
};
