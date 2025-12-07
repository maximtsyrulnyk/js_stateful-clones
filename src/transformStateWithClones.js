export const transformStateWithClones = (state, actions) => {
  const history = [];
  let newState = { ...state };

  for (const action of actions) {
    const prevState = newState;

    switch (action.type) {
      case 'addProperties': {
        const extraData = action.extraData || {};

        newState = { ...prevState, ...extraData };
        break;
      }

      case 'removeProperties': {
        const keysToRemove = action.keysToRemove || [];

        newState = { ...prevState };

        keysToRemove.forEach((key) => {
          delete newState[key];
        });

        break;
      }

      case 'clear': {
        newState = {};
        break;
      }

      default: {
        // Якщо тип дії невідомий — просто клон попереднього стану
        newState = { ...prevState };
      }
    }

    // Before:
    // history.push(newState);

    // After:
    history.push({ ...newState });
    // або: history.push(Object.assign({}, newState));
  }

  return history;
};
