import React from 'react';
import './mainContainer.css';
import HeaderNavbar from '../Navbar/navbar';
import Grid from '../Grid/grid';
import { notifications, notificationTimeOut } from '../../constants/notification';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const mainContainer = (props) => {

    const notify = (notification, message) => {
        switch (notification) {
            case notifications.SUCCESS :
              NotificationManager.success(message, "", notificationTimeOut);
              break;
            case notifications.ERROR :
                NotificationManager.error(message, "", notificationTimeOut);
                break;
            case notifications.WARNING :
                NotificationManager.warning(message, "", notificationTimeOut);
                break;
            case notifications.INFO :
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
