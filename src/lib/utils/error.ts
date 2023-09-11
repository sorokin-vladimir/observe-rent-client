import { errorsMap } from "$lib/constants";
import type { ErrorText, ErrorMessage } from "$lib/types";

export class RentError extends Error {
  public text: ErrorText = 'Error';

  constructor(message: ErrorMessage) {
    super(message);
    this.name = 'RentError';
    this.text = errorsMap[message] ?? 'Unknown error';
  }
}

export function getErrorText(error: Error | RentError) {
  return (error as RentError).text ?? errorsMap.UNKNOWN_ERROR;
}
