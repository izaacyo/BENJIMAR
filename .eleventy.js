const rssPlugin = require('@11ty/eleventy-plugin-rss');


const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

module.exports = config => {


  // Add filters
config.addFilter('dateFilter', dateFilter);
config.addFilter('w3DateFilter', w3DateFilter);


// Plugins
config.addPlugin(rssPlugin);

    // Set directories to pass through to the dist folder
config.addPassthroughCopy('./src/images/');

// Returns a list of people ordered by filename
config.addCollection('people', collection => {
  return collection.getFilteredByGlob('./src/people/*.md').sort((a, b) => {
    return Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1;
  });
});


// Returns work items, sorted by display order
config.addCollection('work', collection => {
  return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md'));
});

// Returns work items, sorted by display order then filtered by featured
config.addCollection('featuredWork', collection => {
  return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md')).filter(
    x => x.data.featured
  );
});


// Returns a collection of blog posts in reverse date order
config.addCollection('blog', collection => {
  return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
});

// Tell 11ty to use the .eleventyignore and ignore our .gitignore file
config.setUseGitIgnore(false);


    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
          input: 'src',
          output: 'dist'
        }
      }};