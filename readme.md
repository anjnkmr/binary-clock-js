# Binary Clock JS
[![NPM](https://nodei.co/npm/binary-clock-js.png)](https://nodei.co/npm/binary-clock-js/)

This displays the draws the Binary Clock on a Canvas

### Demo: [Link](https://anjnkmr.github.io/binary-clock-js/)

### Screenshots
![Screenshot 1](https://github.com/anjnkmr/binary-clock-js/blob/main/screenshots/screenshot1.png?raw=true)

![Screenshot 2](https://github.com/anjnkmr/binary-clock-js/blob/main/screenshots/screenshot2.png?raw=true)

![Screenshot 3](https://github.com/anjnkmr/binary-clock-js/blob/main/screenshots/screenshot3.gif?raw=true)

### Integration Steps
1. Install `binary-clock-js` through `npm`.
   ```
   npm i binary-clock-js -s
2. Add `canvas` tag to your html as below
   ```
   <canvas id="binary-clock-canvas"></canvas>
3. Add the `binary-clock.js` script to your html as below 

   ```
   <script src="/path_to_node_modules/binary-clock-js/binary-clock.js"></script>
   <script>
    new BinaryClock(new Date(), document.getElementById('binary-clock-canvas'))
   </script>
