import type { User } from "$lib/types";
import { deepMap } from "nanostores";

export const user = deepMap<User | Record<string, never>>({});
