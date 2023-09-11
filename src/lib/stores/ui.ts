import { action, map } from "nanostores";
import type { NotificationsContext, UI } from "$lib/types";
import type { getNotificationsContext } from "svelte-notifications";
import { getErrorText } from "$lib/utils";

export const ui = map<UI>({
  isFullscreenLoading: true,
  pushNotification: ({ text, type, removeAfter }) => {
    _notificationsContext.get().addNotification?.({
      text: type === 'error' ? getErrorText(text) : text,
      position: 'bottom-left',
      type,
      removeAfter: removeAfter ?? 7000,
    });
  },
});

export const _notificationsContext = map<NotificationsContext>({
  addNotification: null,
})

export const setFullscreenLoader = action(ui, 'setFullscreenLoader', (store, isLoading: boolean) => {
  store.setKey('isFullscreenLoading', isLoading);
  return store.get();
});

export const setNotificationsContext = action(
  _notificationsContext,
  'setNotificationsContext',
  (store, notificationsContext: ReturnType<typeof getNotificationsContext>) => {
    store.setKey('addNotification', notificationsContext.addNotification);
    return store.get();
});
