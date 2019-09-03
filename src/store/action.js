import { dispatch } from "rxjs/internal/observable/pairs";

// 设置当前音乐信息
export const setCurrentMusic = (data) => {
    return {
        type: "CURRENTMUSIC",
        data
    }
}

// 设置是否播放
export const setIsPlay = (data) => {
    return {
        type: "SETISPLAY",
        data
    }
}

// 设置是否显示播放器
export const setShowPlayer = (data) => {
    return {
        type: "SETSHOWPLAYER",
        data
    }
}

// 设置播放索引
export const setCurrentIndex = (data) => {
    return {
        type: "SETCURRENTINDEX",
        data
    }
}

// 设置播放列表
export const setPlayList = (data) => {
    return {
        type: "SETPLAYLIST",
        data
    }
}

// 播放歌曲
export const setPlayMusic = (playList, index) => (dispatch, getState  ) => {
    dispatch(setPlayList(playList));
    dispatch(setCurrentIndex(index));
    dispatch(setIsPlay(true));
    dispatch(setCurrentMusic(playList[index]));
    dispatch(setShowPlayer(true));
}

// 初始化播放
export const setInitPlay = () => (dispatch, getState  ) => {
    dispatch(setPlayList([]));
    dispatch(setCurrentIndex(-1));
    dispatch(setIsPlay(false));
    // dispatch(setCurrentMusic(playList[index]));
    dispatch(setShowPlayer(false));
}

// 下一曲

export const setNext = ( type ) => (dispatch, getState ) => {
    const { currentIndex, playList } = getState();
    let index;
    if (type === "next"){
        index = currentIndex >= playList.length - 1 ? 0 : currentIndex + 1;
    }else{
        index = currentIndex <= 0 ? playList.length - 1 : currentIndex - 1;
    }
    dispatch(setCurrentIndex(index));
    dispatch(setCurrentMusic(playList[index]));
    dispatch(setIsPlay(true));
}