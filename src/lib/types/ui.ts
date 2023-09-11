import type { getNotificationsContext } from 'svelte-notifications';

export type UI = {
  isFullscreenLoading: boolean;
  pushNotification: ({ text, type, removeAfter }: { text: string; type?: 'success' | 'warning' | 'error' | undefined; removeAfter?: number; }) => void;
}

export type NotificationsContext = {
  addNotification: ReturnType<typeof getNotificationsContext>['addNotification'] | null;
};
