// We are exporting the class directly because we are not going to make an instance of the view
// We will only use it as the parent class of the child views resulView/recipeView
import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length == 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length == 0))
    //   return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    // Virtual living in the memory, but not on the html page.
    // This method will convert the string into real DOM Node objects
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*')); // * means all the elements in there
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('😀😀😀😀 ', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
    // isEqualNode will compare the content of newEl and curEl
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  //
  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
