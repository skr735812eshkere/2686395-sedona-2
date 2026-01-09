import { bodyElement } from './const.js';

const touch = matchMedia('(hover: none)');
let tooltipCleanupFunctions = [];

const initTooltip = (tooltip) => {
  const buttonElement = tooltip.querySelector('.tooltip__button');
  let isSubscribed = false;

  const onButtonClick = () => {
    tooltip.classList.toggle('tooltip--active');
  };

  const onBodyClick = (evt) => {
    if (evt.target.closest('.tooltip')) {
      evt.stopPropagation();
    } else {
      tooltip.classList.remove('tooltip--active');
    }
  };

  const breakpointChecker = () => {
    if (touch.matches && !isSubscribed) {
      buttonElement.addEventListener('click', onButtonClick);
      bodyElement.addEventListener('click', onBodyClick);
      isSubscribed = true;
    } else if (!touch.matches && isSubscribed) {
      buttonElement.removeEventListener('click', onButtonClick);
      bodyElement.removeEventListener('click', onBodyClick);
      isSubscribed = false;
    }
  };

  const handleMediaChange = () => {
    breakpointChecker();
  };

  breakpointChecker();
  touch.addEventListener('change', handleMediaChange);

  const destroyTooltip = () => {
    buttonElement.removeEventListener('click', onButtonClick);
    bodyElement.removeEventListener('click', onBodyClick);

    touch.removeEventListener('change', handleMediaChange);

    tooltip.classList.remove('tooltip--active');

    isSubscribed = false;
  };

  return destroyTooltip;
};

const initAllTooltips = (wrapper) => {
  destroyAllTooltips();

  const tooltips = wrapper.querySelectorAll('.tooltip');

  if (tooltips.length) {
    tooltips.forEach((tooltip) => {
      const cleanupFunction = initTooltip(tooltip);
      tooltipCleanupFunctions.push(cleanupFunction);
    });
  }
};

const destroyAllTooltips = () => {
  tooltipCleanupFunctions.forEach((cleanupFn) => {
    cleanupFn();
  });

  tooltipCleanupFunctions = [];
};

export { initAllTooltips, destroyAllTooltips };
