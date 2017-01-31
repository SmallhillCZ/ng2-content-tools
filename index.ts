import { NgModule }           from '@angular/core';

import { ContentToolsService } from './src/service';
import { ContentToolsDirective } from './src/directive';

export { ContentToolsService };
export { ContentToolsDirective };

@NgModule({
  imports:      [ ],
  declarations: [ ContentToolsDirective ],
  exports:      [ ],
  providers:    [ ContentToolsService ]
})
export class ContentToolsModule { }