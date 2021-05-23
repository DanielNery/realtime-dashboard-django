  // create instance
  var heatmapInstance = h337.create({
    container: document.querySelector('.heatmap'),
    radius: 10
    });
    document.querySelector('.demo-wrapper').onmousemove = function(ev) {
        console.log('\n\nx: ' + String(ev.layerX) + '\ny: ' + String(ev.layerY))
        heatmapInstance.addData({
            x: ev.layerX,
            y: ev.layerY,
            value: 1
        });
    };
    // that's it... yay right? ;)