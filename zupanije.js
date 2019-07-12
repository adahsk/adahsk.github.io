/* Pan zoom library */
$(document).ready(function () {
      panZoom = svgPanZoom("#hrzup", {
            controlIconsEnabled: true,
            contain: true,
            fit: 1,
            center: 1,
            dblClickZoomEnabled: false,
            minZoom: 0.1
      })
});

$(window).resize(function () {
      panZoom.resize();
      panZoom.fit();
      panZoom.center();
     
});


var htmlSVG = document.getElementById("hrzup").contentDocument;
svgd3 = d3.select (htmlSVG);
karta = svgd3.select("#karta");


/* Zoom to županije */
var pop = karta.selectAll("g.pol");
var baseWidth = 1400;
var baseHeight = 960;
var scale;

pop.on("click", function(){
      var bbox = this.getBBox();
                       
      zoomX = -bbox.x;
      zoomY = -bbox.y;
      scale = Math.min( baseWidth / bbox.width, baseHeight / bbox.height);
      
      

  // set a transform on the parent group element
  karta.select("#zombi")
      .attr("transform", "scale(" + scale + " )" + "translate(" + zoomX + "," + zoomY + ")");
      
})






