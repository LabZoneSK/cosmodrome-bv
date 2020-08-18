# cosmodrome-bv
Gulp/Webpack hybrid scaffolding for projects based on Vue and Bootstrap

## Initial setup

Run `npm install`.

### Editor configuration

All covered by `.editorconfig`. Just make sure you have IDE/Editor specific support enabled.

### Every day development

Run `gulp watch-dev`

### Production build
Run `gulp build`

### Notes

- static assets, like images and fonts should go directly to `web` directory
- this setup doesn't come with server, so you'll need to fire one up and server `web` directory
- this setup includes Vuex, Bootstrap, Poper and jQuery
- examples of both SingleFile vue component and "raw" JS component are present
