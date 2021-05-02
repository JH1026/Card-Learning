export const init = () => {
  localStorage.setItem('cardGroup_nextId', '1');
};

export const checkInit = () => {
  if (localStorage.getItem('setting') === null) {
    localStorage.setItem('setting', JSON.stringify({
      initDate: new Date(),
    }));
    init();
  }
};

export const clearStorage = () => {
  localStorage.clear();
};
