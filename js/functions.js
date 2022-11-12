import { btnInputSearch } from './selectors.js';

export function cleanHtml(selector) {
  while (selector.firstChild) {
    selector.removeChild(selector.firstChild);
  }
}

export function disableButton() {
  btnInputSearch.disabled = true;
}

export function enableButton() {
  btnInputSearch.disabled = false;
}
