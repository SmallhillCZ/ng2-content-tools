import { NgModule, ModuleWithProviders }           from '@angular/core';

import { ContentToolsService } from './src/service';
import { ContentToolsDirective } from './src/directive';

export { ContentToolsService, ContentToolsDirective };

@NgModule({
  declarations: [ ContentToolsDirective ],
  exports:      [ ContentToolsDirective ]
})
export class ContentToolsModule {
	public static forRoot(): ModuleWithProviders {
    return {ngModule: ContentToolsModule, providers: [ContentToolsService]};
  }
}