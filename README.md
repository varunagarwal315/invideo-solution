# invideo-solution

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

#### Points to note
- Vue.Js has been used with classes and decorators
- `vue-router` has been used to load the canvas page onto `index.html`
- Primary code has not been split into reusable components
- Images from Piscum are 800kb and massive resolution so it takes some time to load
- Kona has been used for canvas manipulation
- Images are resized to best fit the canvas depending on the aspect ratios
- User has to select the image and drag-drop on the canvas
- Use of multiple images has currently been disabled and draggable as false
- To allow for them tweak below code
```
image.position(stage.getPointerPosition());
image.draggable(false);
```
- Console throws some errors as a `.d.ts` file isn't generated but the UI does work
- Selecting Landscape and Portrait will clear the canvas and start the calculations and loading of images again
- Efficient image caching has not been done
- When images are blurred the offset and cropping has not been set as the ReadMe.md doesn't specify. To enable it uncomment `image.position(stage.getPointerPosition());` to get the `(x, y)` offset based on where the mouse was when the image was dropped
- Downloading image isn't yet implemented
