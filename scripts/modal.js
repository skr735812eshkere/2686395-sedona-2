import { isEscapeKey } from './utils.js';
import { initAllCounters, destroyAllCounters } from './counter.js';
import { initAllTooltips, destroyAllTooltips } from './tooltip.js';
import { bodyElement } from './const.js';

const containerElement = bodyElement.querySelector('.container');
const openButtonElement = containerElement.querySelector('.js-modal-button');
const modalElement = bodyElement.querySelector('.modal');
let closeButtonElement;
let checkInInputElement;

if (modalElement) {
  closeButtonElement = modalElement.querySelector('.modal__close');
  checkInInputElement = modalElement.querySelector('[name="check-in"]');
}

const loopFocusOnModal = () => {
  containerElement.setAttribute('inert', true);
};

const removeLoopFocusOnModal = () => {
  containerElement.removeAttribute('inert');
};

const onButtonClick = (evt) => {
  evt.preventDefault();
  openModal();
};

const onCloseButtonClick = () => {
  closeModal();
};

const onOverlayClick = (evt) => {
  if (evt.target.closest('.modal__content')) {
    evt.stopPropagation();
  } else {
    closeModal();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const registerButtonClickEvents = () => {
  openButtonElement.addEventListener('click', onButtonClick);
};

function openModal() {
  modalElement.classList.remove('modal--hidden');
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  setTimeout(() => {
    document.addEventListener('click', onOverlayClick);
  }, 0);
  document.addEventListener('keydown', onDocumentKeydown);
  loopFocusOnModal();
  checkInInputElement.focus();
  bodyElement.style = 'overflow: hidden;';
  initAllCounters(modalElement);
  initAllTooltips(modalElement);
}

function closeModal() {
  modalElement.classList.add('modal--hidden');
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('click', onOverlayClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  removeLoopFocusOnModal();
  bodyElement.removeAttribute('style');
  destroyAllCounters();
  destroyAllTooltips();
}

const initModal = () => {
  if (openButtonElement) {
    registerButtonClickEvents();
  }
};

export { initModal };
