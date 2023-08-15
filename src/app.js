const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'XYH1POCESZ',
  '8b6e599589dcc605cfc1711d22132166'
);

const search = instantsearch({
  indexName: 'test_RESTAURANTS',
  searchClient,
  insights: true,
});

search.addWidgets([
  
  
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: "Search for your new favourite too!",
    autofocus: true,
    searchAsYouType: false,
    showReset: true,
    showSubmit: true,
    showLoadingIndicator: false,
  }),


  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, { html, components }) => html`
        <article class="restaurant-hit">
          <img src="${hit.imageURL}" alt="${hit.name}" style="max-width: 100px;"/>
          <h2><a href="${hit.url}" target="_blank">${components.Highlight({ hit, attribute: 'name' })}</a></h2>
          <p class="restaurant-location">
            ${components.Highlight({ hit, attribute: 'location' })}
          </p>
          <p class="restaurant-description">
            ${components.Highlight({ hit, attribute: 'description' })}
          </p>
        </article>
      `,
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.dynamicWidgets({
    container: '#dynamic-widgets',
    fallbackWidget({ container, attribute }) {
      return instantsearch.widgets.panel({
        templates: { header: () => attribute },
      })(instantsearch.widgets.refinementList)({
        container,
        attribute,
      });
    },
    widgets: [],
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),

  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
  }),

  instantsearch.widgets.refinementList({
    container: '#location-list',
    attribute: 'location',
  }),
]);

search.start();
