import type { errorsMap } from "$lib/constants";

export type ErrorMessage = keyof typeof errorsMap;
export type ErrorText = typeof errorsMap[ErrorMessage];
