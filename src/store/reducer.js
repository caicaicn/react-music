import { combineReducers } from "redux";

import * as actionType from "./action-types";


var initState = {
    isPlay: false,
    isChange: false,
    currentIndex: -1,
    playList: [],
    currentMusic: {},
    showPlayer: false 
};

export default (state = initState, action) => {
    switch (action.type) {
        case actionType.CURRENTMUSIC:
            return Object.assign({}, { ...state}, { currentMusic: action.data });
            break;
        case actionType.SETISPLAY:
            return Object.assign({}, { ...state }, { isPlay: action.data});
            break;
        case actionType.SETCURRENTINDEX:
            return Object.assign({}, { ...state }, { currentIndex: action.data});
            break;
        case actionType.SETPLAYLIST:
            return Object.assign({}, { ...state }, { playList: action.data});
            break;
        case actionType.SETSHOWPLAYER:
            return Object.assign({}, { ...state }, { showPlayer: action.data});
            break;
        default:
            return state;
            break;
    }
    return state;
};

