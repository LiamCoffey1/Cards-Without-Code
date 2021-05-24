export const setCards = cards => {
    return {
      type: "SET_CARDS",
      payload: cards
    };
  };


  export const removeCard = index => {
    return {
      type: "REMOVE_CARD",
      payload: index
    };
  };

  export const resetCards = () => {
    return {
      type: "RESET_CARDS",
      payload: null
    };
  };

  export const addCard = card => {
    return {
      type: "NEW_CARD",
      payload: card
    };
  };
