
import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const Home = React.lazy(() => import('../page/home/index'));
const SheetList = React.lazy(() => import('../page/sheetList/index'));
const PlayList = React.lazy(() => import('../page/playList/index'));
const RankList = React.lazy(() => import('../page/rankList/index'));

export default () => (
    <BrowserRouter>
    
        <Suspense fallback={null}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/sheetlist" component={SheetList} />
                <Route path="/playlist/:id" component={PlayList} />
                <Route path="/rankList" component={RankList} />
                <Redirect to="/" />
            </Switch>
        </Suspense>
    </BrowserRouter>
);
 