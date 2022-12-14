import icons from 'url:../../img/icons.svg'; // Parcel 2
import View from './Views.js';

// A child class of View
class ResultsView extends View {
  //
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipe was found! Please try another query ;)`;
  _successMessage = ``;

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    return `
    <li class="preview">
      <a class="preview__link ${
        result.id === id ? 'preview__link--active' : ''
      }" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
        </div>
      </a>
    </li>`;
  }
}

export default new ResultsView();
