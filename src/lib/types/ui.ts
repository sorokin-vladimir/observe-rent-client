import type { RentError } from '$lib/utils';
import type { getNotificationsContext } from 'svelte-notifications';

type PushNotificationArgs = (
    | {
      text: string;
      type?: 'success' | 'warning' | undefined;
    } | {
      text: RentError | Error;
      type?: 'error';
    }
  ) & { removeAfter?: number; };

export type UI = {
  isFullscreenLoading: boolean;
  pushNotification: ({ text, type, removeAfter }: PushNotificationArgs) => void;
}

export type NotificationsContext = {
  addNotification: ReturnType<typeof getNotificationsContext>['addNotification'] | null;
};
