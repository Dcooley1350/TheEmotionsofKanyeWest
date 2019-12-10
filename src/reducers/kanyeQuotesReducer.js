export default (state = {}, action) => {
    let newState;
    const { type, KWestState } = action;
    switch(type){
        case 'KANYE_MOOD':
            newState = Object.assign({}, state, {KWestMoodAndQuotes: KWestState});
            return newState;
        default:
            return state;
    }
}