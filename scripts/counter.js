let counterHandlers = [];

const initCounter = (counterElement) => {
  const inputValueElement = counterElement.querySelector('.field__counter input');

  const MIN_COUNT_VALUE = inputValueElement.min !== ''
  ? Number(inputValueElement.min)
  : 0;

  const MAX_COUNT_VALUE = inputValueElement.max !== ''
    ? Number(inputValueElement.max)
    : 99;

  const buttonSmallerElement = counterElement.querySelector('.field__button--less');
  const buttonBiggerElement = counterElement.querySelector('.field__button--more');

  const onButtonSmallerClick = () => {
    const currentValue = Number(inputValueElement.value);
    if (currentValue > MIN_COUNT_VALUE) {
      inputValueElement.value = currentValue - 1;
    }
  };

  const onButtonBiggerClick = () => {
    const currentValue = Number(inputValueElement.value);
    if (currentValue < MAX_COUNT_VALUE) {
      inputValueElement.value = currentValue + 1;
    }
  };

  const registerEvents = () => {
    buttonSmallerElement.addEventListener('click', onButtonSmallerClick);
    buttonBiggerElement.addEventListener('click', onButtonBiggerClick);
  };

  const destroyEvents = () => {
    buttonSmallerElement.removeEventListener('click', onButtonSmallerClick);
    buttonBiggerElement.removeEventListener('click', onButtonBiggerClick);
  };

  return { registerEvents, destroyEvents };
};

const initAllCounters = (wrapper) => {
  destroyAllCounters();

  const counters = wrapper.querySelectorAll('.field--counter');

  if (counters.length) {
    counters.forEach((counterElement) => {
      const handler = initCounter(counterElement);
      handler.registerEvents();
      counterHandlers.push(handler);
    });
  }
};

const destroyAllCounters = () => {
  counterHandlers.forEach(handler => {
    handler.destroyEvents();
  });

  counterHandlers = [];
};

export { initAllCounters, destroyAllCounters };
