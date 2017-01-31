import { NgModule }           from '@angular/core';

import { ContentToolsService } from './src/service';
import { ContentToolsDirective } from './src/directive';

@NgModule({
  imports:      [ ],
  declarations: [ ContentToolsDirective ],
  exports:      [ ],
  providers:    [ ContentToolsService ]
})
export class ContentToolsModule { }

export ContentToolsService;
export ContentToolsDirective;