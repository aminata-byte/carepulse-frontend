import { create } from 'zustand';

type Notification = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};

type NotificationState = {
  notifications: Notification[];

  addNotification: (notif: Notification) => void;
  removeNotification: (id: string) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],

  addNotification: (notif) =>
    set((state) => ({
      notifications: [...state.notifications, notif],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
