function initState(){ //INITIAL USER DATA
	let cards = null
	try{
		cards = JSON.parse(localStorage.cards); //GET IF USER DATA IN LOCALSTORAGE
	}catch(e){}
	const state = { // Will be passed to props as user
		cards // Will be passed to props as user.data
	}
	return state;
}
/*
Set Cards
Update Card
Delete Card
*/


export default function (state = initState(), action) {
    let newState;
    let index;
    switch (action.type) {
        case "SET_CARDS":
            let cards = action.payload;
            newState = state;
            newState.cards = {cards};
            localStorage.setItem('cards', JSON.stringify({cards: action.payload}));
            return {...newState}
            case "RESET_CARDS":
                return initState();
        case "NEW_CARD":
            let card = action.payload;
            newState = state;
            newState.cards.cards.push(card)
            localStorage.setItem('cards', JSON.stringify({...newState.cards}));
            return {...newState}
        case "REMOVE_CARD":
            index = action.payload;
            newState = state;
            let copy = newState.cards.cards;
            newState.cards.cards = copy.filter(value=>value._id !== index)
            localStorage.setItem('cards', JSON.stringify({...newState.cards}));
            return {...newState}
        default:
            return state;
    }
}