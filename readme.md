# Binary Clock JS
This displays the draws the Binary Clock on a Canvas

### Demo: [Link](https://anjnkmr.github.io/binary-clock-js/)

### Screenshots
![Screenshot 1](https://github.com/anjnkmr/binary-clock-js/blob/main/screenshots/screenshot1.png?raw=true)

![Screenshot 2](https://github.com/anjnkmr/binary-clock-js/blob/main/screenshots/screenshot2.png?raw=true)

![Screenshot 3](https://github.com/anjnkmr/binary-clock-js/blob/main/screenshots/screenshot3.gif?raw=true)

### Integration Steps

1. Add `canvas` tag to your html as below

   `<canvas id="binary-clock-canvas"></canvas>`
2. Add the `binary-clock.js` script to your html as below 

   ```
   <script src="./binary-clock.js"></script>
   <script>
    new BinaryClock(new Date(), document.getElementById('binary-clock-canvas'))
   </script>
      



