# ng2-content-tools

This package creates an Angular 2 directive for Content Tools (getcontenttools.com) editable region.

## Installation

Firstly, install this npm package:

``` sh
npm install SmallhillCZ/ng2-content-tools
```

Now include ContentTools js and css files in your index.html:
``` html
<link rel="stylesheet" type="text/css" href="node_modules/ContentTools/build/content-tools.min.css">
<script src="node_modules/ContentTools/build/content-tools.min.js"></script>
```


## Using the directive

### 1) Initiate the editor

``` typescript
import { Component } from '@angular/core';

import { ContentToolsService } from 'ng2-content-tools';

@Component({ ... })
export class AppComponent {

	constructor(private ctService: ContentToolsService) {}

	ngOnInit(){
		this.ctService.init({
			fixture: (el) => el.hasAttribute('data-fixture'),
			ignition: false
		});
	}   

}
```

- The settings are the same as in Content Tools
- Query is not used, because regions are determined by using the directive
- name is not used as ID parameter is used.

### Include directive in Angular2 template

``` html
<div content-tools [editing]="" [editable]="" (start)="" (stop)="" (save)=""></div>
```
### Configuring Content Tools

You can configure Content Tools in the standard way. The editor instance is stored at
```
ContentToolsService.editor
```

### Directive parameters
#### editing:boolean
- This parameter decides, whether the region is being edited at the moment.
- If set true, only this region will be activated for editing.
- If another region is set for editing while editing this one, it will be added to editing.

#### editable:boolean
- This parameter decides, whether the region will be activated for editing when editing is activated by IgnitionUI

### Events

#### start
- Event is fired when editing of this region is started

#### stop
- Event is fired when editing of this region is stopped

#### save
- Event is fired after stop if this region should be saved

