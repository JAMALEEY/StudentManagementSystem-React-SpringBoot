import { description, message, notification } from "antd";

const openNotification = (type, message, description) => {
    notification[type]({
        message,
        description
    });
};
    export const succesNotification = (message, description) =>
    openNotification('success', message, description);
    
    export const infoNotification = (message, description) =>
    openNotification('info', message, description);

    export const warningNotification = (message, description) =>
    openNotification('warning', message, description);

    export const errorNotification = (message, description) =>
    openNotification('error', message, description);