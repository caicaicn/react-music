
import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const Home = React.lazy(() => import('../page/home/index'));
const SheetList = React.lazy(() => import('../page/sheetList/index'));
const PlayList = React.lazy(() => import('../page/playList/index'));
const RankList = React.lazy(() => import('../page/rankList/index'));

const router = [
    {
        path: "/",
        component: Home,
        headerShow: false
    },
    {
        path: "/home",
        component: Home,
        headerShow: false
    },
    {
        path: "/sheetlist",
        component: SheetList,
        headerShow: true
    },
    {
        path: "/playlist/:id",
        component: PlayList,
        headerShow: true
    },
    {
        path: "/rankList",
        component: RankList,
        headerShow: true
    }
]



export default () => (
    <BrowserRouter>
        <Suspense fallback={null}>
            <Switch>
                {
                    router.map(({ ...rest }, index) => <Route exact path={rest.path} component={rest.component} key={index} />)
                }
                <Redirect to="/" />
            </Switch>
        </Suspense>
    </BrowserRouter>
);
 