// The model is all about the data

import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helper.js';
import { RES_PER_PAGE } from './config.js';

export const state = {
  // The state contains all the data that we need in order to build our application
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bce0d'
      `${API_URL}${id}`
    );

    const { recipe } = data.data;
    // console.log(recipe); // destructuring data.data.recipe
    state.recipe = {
      id: recipe.id,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      title: recipe.title,
      servings: recipe.servings,
    };
    console.log(state.recipe);
  } catch (err) {
    console.log(`${err} 🔥🔥🔥🔥🔥`);
    throw err;
  }
};

//

export const loadSearchResults = async function (query) {
  //
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log(data.data.recipes);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} 🔥🔥🔥🔥`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  // console.log(page);
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
  });

  state.recipe.servings = newServings;
};
