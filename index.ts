import { NgModule }           from '@angular/core';

import { ContentToolsService } from './src/service';
import { ContentToolsDirective } from './src/directive';

export { ContentToolsService, ContentToolsDirective };

@NgModule({
  declarations: [ ContentToolsDirective ],
  exports:      [ ContentToolsDirective ],
	providers: 		[ ContentToolsService ]
})
export class ContentToolsModule { }