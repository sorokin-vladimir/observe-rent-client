import { logger } from '@nanostores/logger'
import { dev, browser,  } from "$app/environment";
import { user } from './user';
import { housings } from './housing';
import { fields } from './fields';
import { counters } from './counters';
import { ui } from './ui';

export * from './housing';
export * from './user';
export * from './fields';
export * from './ui';
export * from './table_data';
export * from './counters';



if (dev && browser) {
  /* let destroy =  */logger({
    Housings: housings,
    Fields: fields,
    Counters: counters,
    User: user,
    UI: ui,
  });
}
