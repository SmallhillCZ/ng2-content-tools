# ng2-content-tools

This package creates an Angular 2 directive for Content Tools (getcontenttools.com) editable region.

## Installation

Firstly, install this npm package:

```
npm install ng2-content-tools
```

Now include ContentTools js and css files in your index.html:
```
<link rel="stylesheet" type="text/css" href="node_modules/ContentTools/build/content-tools.min.css">
<script src="node_modules/ContentTools/build/content-tools.min.js"></script>
```


## Using the directive

Include directive in yout Angular 2 template:

```
<div content-tools [editing]="" [editable]="" (start)="" (stop)="" (save)=""></div>
```

### Settings
`editing:boolean` - Decides, whether the region is being edited at the moment. If set true, only this region will be activated for editing. If another region is set for editing while editing this one, it will be added to editing.

`editable:boolean` - decides, whether the region will be activated for editing by the IgnitionUI

