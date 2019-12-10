import watsonRequest from './../WatsonStuff'

const mapApiCallToState = store => next => action => {
    let state = store.getState();
    let newState;
    let newAction;
    switch(action.type) {
        case 'KANYE_MOOD':
            const KanyeWestDataViaWatson = watsonRequest();
            newState = Object.assign({},state,{ 
                KWESTDATA: KanyeWestDataViaWatson
            });
            newAction = Object.assign({},action, {KWestState: newState});
            return next(newAction);
        default:
            return next(action);
    };
};

export default mapApiCallToState;