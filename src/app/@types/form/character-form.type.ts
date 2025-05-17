import { FormControl } from '@angular/forms';

import { Side } from '../enums';

export type CharacterForm = {
  avatar: FormControl<string>;
  name: FormControl<string>;
  side: FormControl<Side>;
  power: FormControl<string>;
  midiclorian: FormControl<number>;
  description: FormControl<string>;
};
