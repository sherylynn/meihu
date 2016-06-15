/**
 * Created by kenny on 16/3/7.
 */
'use strict';

import React, {
    Component,
} from 'react';
import {
    Navigator,
} from 'react-native';

import Kankan from './views/kankan';

export default class RouteKankan extends Component {
    render() {
        let defaultName = 'Kankan';
        let defaultComponent = Kankan;
        return (
            <Navigator
                initialRoute={{ name: defaultName, component: defaultComponent }}
                configureScene={() => {
                    return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
                } }
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator}/>;
                } }
                />
        )
    }
}