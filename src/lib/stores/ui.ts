import { action, map } from "nanostores"
import type { UI } from "$lib/types"

export const ui = map<UI>({
  isFullscreenLoading: true,
});

export const setFullscreenLoader = action(ui, 'setFullscreenLoader', (store, isLoading: boolean) => {
  store.setKey('isFullscreenLoading', isLoading);
  return store.get();
});
