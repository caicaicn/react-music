import React, { Component } from "react";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
// doc https://github.com/oliviertassinari/react-swipeable-views

const Banner = (props) => {
    const { bannerList, interval } = props;
    return bannerList.length > 0 && <AutoPlaySwipeableViews interval={interval}>
        {
            bannerList.length > 0 && bannerList.map(
                (item, index) => <img style={{'width': '100%'}} src={item.pic} key={index} alt={item.typeTitle} />
            )
        }
    </AutoPlaySwipeableViews>
}

export default Banner;