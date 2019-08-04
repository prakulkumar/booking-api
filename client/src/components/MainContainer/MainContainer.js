import React from 'react';
import HeaderNavbar from '../Navbar/Navbar';
import Grid from '../Grid/Grid';
import './MainContainer.css';
import { types, notificationTimeOut } from '../../constants/notification';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const mainContainer = (props) => {
    const notify = (type, message) => {
        switch (type) {
            case types.SUCCESS :
              NotificationManager.success(message, "", notificationTimeOut);
              break;
            case types.ERROR :
                NotificationManager.error(message, "", notificationTimeOut);
                break;
            case types.WARNING :
                NotificationManager.warning(message, "", notificationTimeOut);
                break;
            case types.INFO :
                NotificationManager.info(message, "", notificationTimeOut);
                break;
            default :
                NotificationManager.info(message, "", notificationTimeOut);
        }
    }

    return (
        <div style={{ height: '100%' }}>
            <NotificationContainer />
            <HeaderNavbar></HeaderNavbar>
            <Grid notify={(notification, message) => notify(notification, message)} />
        </div>
    );
}

export default mainContainer;
