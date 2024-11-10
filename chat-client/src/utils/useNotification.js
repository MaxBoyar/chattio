import { notification } from 'antd';

export function useNotification(type) {
    const [api, contextHolder] = notification.useNotification();
    const notify = (message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    return { contextHolder, notify };
}
