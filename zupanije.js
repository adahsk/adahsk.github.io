var w = $(".content").height();


/* device pixel - device resolution - feature of monitor - it doesn't change */
var dw = screen.width;



/* CSS pixel - browser window + scrollbars */
var bw = window.innerWidth;
var bh = window.innerHeight;


/* viewport dimensions */
var vh = document.documentElement.clientHeight;
var vw = document.documentElement.clientWidth;

var a = $(".col-md-10").height();
var b = $(".col-md-10").width()


/* Pan-zoom bibljoteka 

var svgObject = document.querySelector("#hrzup");
var panZoom = svgPanZoom(svgObject, {
      controlIconsEnabled: true,
      contain: true,
      fit:1,
      center:1
}); 



$(window).resize(function(){
  panZoom.resize();
  panZoom.fit();
  panZoom.center();
});


$(function() {
      panZoom = svgPanZoom("#hrzup", {
      controlIconsEnabled: true,
      contain: true,
      fit:1,
      center:1,
})});




/* Pan zoom karte plus centriranje za responzivnost */
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





/* dropdbtn button funkcionalnost */
/* classList returns the class name(s) of an element, as a DOMTokenList object */
function myFunction1() {
      document.getElementById("lista").classList.toggle("show");
}



/* Pali gasi layere */
function showSVG() {

      var obj = document.getElementById("hrzup");
      var svgDoc = obj.contentDocument;
      var svgZc = svgDoc.getElementById("Županijski_centri");
      var svgGr = svgDoc.getElementById("Veći_gradovi");
      var svgRi = svgDoc.getElementsByClassName("Rijeke");
      var svgJe = svgDoc.getElementById("Jezera");


      if (s1.checked == true) {
            svgZc.setAttribute("visibility", "visible");
            
      }
      else {
            svgZc.setAttribute("visibility", "hidden");
      };


      if (s2.checked == true) {
            svgGr.setAttribute("visibility", "visible");
      }
      else {
            svgGr.setAttribute("visibility", "hidden");
      };


      for (i = 0; i < svgRi.length; i++) {

            if (s3.checked == true) {
                  svgRi[i].setAttribute("visibility", "visible");
            }
            else {
                  svgRi[i].setAttribute("visibility", "hidden");
            }
      };


      if (s4.checked == true) {
            svgJe.setAttribute("visibility", "visible");
      }
      else {
            svgJe.setAttribute("visibility", "hidden");
      };
}


/* 
var mySVG = d3.select(document.getElementById("hrzup").contentDocument);
var myGroup = mySVG.select("g#Županijski_centri").selectAll("circle");
myGroup.style("fill", "blue");
*/

var htmlSVG = document.getElementById("hrzup").contentDocument;
svgd3 = d3.select (htmlSVG);
karta = svgd3.select("#karta");

var župCentri = karta.selectAll("#Županijski_centri circle");
župCentri.style("fill", "red");

/* 
Drugi način za pozivanje svih krugova Županijskih centara
župCentri.each(function(){
      d3.select(this)
      .style("fill", "blue")  
});
*/




   
                  
/* Cupanje podataka iz svg-a: nazivi gradova koji se povlače iz klase */

var svg = document.getElementById("hrzup");
var svgDoc = svg.contentDocument;

var zupElement = svgDoc.getElementById("Županijski_centri"); /* Node Element */ 
var kruzicZup = zupElement.getElementsByTagName("circle"); /* HTML Colletction */
/* const nodeArray = Array.from(circle);   - služi za pretvaranje HTMLCollection to Array */
var naziviGradova = [];
for (var i=0; i<kruzicZup.length; i++) {
      var text = "";
      text += kruzicZup[i].getAttribute("class");   /* Rezultat je string kojeg treba ubaciti u array */
      naziviGradova.push(text);  
}

/* Racunanje koordinata pojedinog elementa svg-a: koordinate glavnih gradova županija */
var svgKarta = svgDoc.getElementById("karta");
var CTM = svgKarta.getScreenCTM();

var kooZupdx = [];
var kooZupdy = [];
for (var i = 0; i < kruzicZup.length; i++) {
      var DOMRect = kruzicZup[i].getBoundingClientRect();
      var text1 = "";
      var dx = (DOMRect.right-CTM.e+2)/CTM.a;
      text1 += dx;
      kooZupdx.push(text1);
      var text2 = "";
      var dy = (DOMRect.bottom-CTM.f+4)/CTM.d;
      text2 += dy;
      kooZupdy.push(text2);   
}

var ZuGraNaziv = karta.selectAll("g.item").selectAll("text")
                  .data(naziviGradova)
                  .enter()
                  .append("text")
                  .attr("x", function(d,i){return kooZupdx[i]})
                  .attr("y", function(d,i){return kooZupdy[i]})
                  .text(function(d) {return d;})
                  .attr("font-size", "12px")
                  .attr("fill", "black");

/* Jezera */
var jezElement = svgDoc.getElementById("Jezera");
var path = jezElement.getElementsByTagName("path");
var naziviJezera = [];
for (var i=0; i<path.length; i++) {
      var text = "";
      text += path[i].getAttribute("class"); 
            if (text =="null") {naziviJezera.push(text="")}
            else { 
            naziviJezera.push(text);
            }    
}

var kooJezdx = [];
var kooJezdy = [];
for (var i = 0; i < path.length; i++) {
      var DOMRect = path[i].getBoundingClientRect();
      var text1 = "";
      var dx = (DOMRect.right-CTM.e)/CTM.a;
      text1 += dx;
      kooJezdx.push(text1);
      var text2 = "";
      var dy = (DOMRect.bottom-CTM.f)/CTM.d;
      text2 += dy;
      kooJezdy.push(text2);   
}

var JezNaziv = karta.selectAll("g.jez").selectAll("text")
                  .data(naziviJezera)
                  .enter()
                  .append("text")
                  .attr("x", function(d,i){return kooJezdx[i]})
                  .attr("y", function(d,i){return kooJezdy[i]})
                  .text(function(d) {return d;})
                  .attr("transform", function ()
                              {return " translate(0 ,-5)" })
                  .attr("font-size", "12px")
                  .attr("fill", "#00A0E3");



/* Veći gradovi */
var gradoviElement = svgDoc.getElementById("Veći_gradovi");
var gradoviCircle = gradoviElement.getElementsByTagName("circle");
var naziviGradova = [];
for (var i=0; i<gradoviCircle.length; i++) {
      var text = "";
      text += gradoviCircle[i].getAttribute("class"); 
            if (text == "null") {naziviGradova.push(text="")}
            else { 
                  naziviGradova.push(text);
            }           
}

var kooGraddx = [];
var kooGraddy = [];
var ko = [];
for (var i = 0; i < gradoviCircle.length; i++) {
      var DOMRect = gradoviCircle[i].getBoundingClientRect();
      var text1 = "";
      var dx = (DOMRect.right-CTM.e+2)/CTM.a +5;
      text1 += dx;
      kooGraddx.push(text1);
      var text2 = "";
      var dy = (DOMRect.bottom-CTM.f-1)/CTM.d -20;
      text2 += dy;
      kooGraddy.push(text2);
      

      
}




/* Tooltip pomoću javascripta unutar svg-a: 
Kreiranje g, rect i text elementa u svg-u za stvaranje tooltip pravokutnika s tekstom koji će se javascriptom dovesti na poziciju miša
*/

var gElement = karta.selectAll("g.gradici").append("g").attr("id", "naziv_gradova").attr("class", "joj").attr("visibility", "hidden");
var rect = gElement.append("rect").attr("width", "80px").attr("height", "20px").attr("fill-opacity","0");
var textTooltip = gElement.append("text").text("neki tekst").attr("x", "0px").attr("y","12px").attr("dominant-baseline", "no-change").style("font-size", "20px");

var polgElement = svgDoc.getElementById("naziv_gradova");
var textTooltipVrijednost = polgElement.getElementsByTagName("text")[0].firstChild;
var polRe = polgElement.getElementsByTagName("rect");


for (let i=0; i<gradoviCircle.length; i++){
      gradoviCircle[i].addEventListener('mousemove', function(){show(i);});
      gradoviCircle[i].addEventListener('mouseout', hide);  
}

function show(i) {
      polgElement.setAttributeNS(null, "transform","translate(" + kooGraddx[i] + ", " + kooGraddy[i] + ")");
      polgElement.setAttributeNS(null, "visibility", "visible");
      textTooltipVrijednost.data = gradoviCircle[i].getAttributeNS(null, "class"); 
}

function hide(){
      polgElement.setAttributeNS(null, "visibility", "hidden");
}

/*Tooltip pomoću javascripta unutar HTML-a: 
Prikaz naziva gradova na hover pomoću div elementa kreiranog u html */
/*
let mouse = {};
let tooltip = document.getElementById("nazivi");
svgKarta.addEventListener("mousemove", e => {
  tooltip.innerHTML = "";
  if (e.target.tagName == "circle") {
    mouse = pozicijaMisa(svgKarta, e);
    tooltip.style.display="block";
    tooltip.innerHTML = e.target.getAttributeNS(null, "class");
    tooltip.style.left = mouse.x -30 + "px";
    tooltip.style.top = mouse.y - 40 + "px";
  }
  else {tooltip.style.display="none";}
});

function pozicijaMisa(gradoviCircle, evt) {
  var ClientRect = gradoviCircle.getBoundingClientRect();
  return {
    //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  };
}
*/


/* - Mice se na panzoom - vratiti se na to
for (let i = 0; i < gradoviCircle.length; i++) {
    gradoviCircle[i].addEventListener('mousemove', show);
    gradoviCircle[i].addEventListener('mouseout', hide); 
        }
       
function show(e) {
      mouse = pozicijaMisa(svgKarta, e);
      //mouse.x = e.clientX;
      //mouse.y = e.clientY;
      polgElement.setAttributeNS(null, "transform", "translate(" + mouse.x + "," + mouse.y + ")");
      polgElement.setAttributeNS(null, "visibility", "visible");
      textTooltipVrijednost.data = e.target.getAttributeNS(null, "class");        
}

function hide(){
      polgElement.setAttributeNS(null, "visibility", "hidden");
}

function pozicijaMisa(gradoviCircle, evt) {
  var ClientRect = gradoviCircle.getBoundingClientRect();
  return {
    //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  };
}

*/

/*
function show(evt) {
   
var pt, cursorpt;        
pt = svgKarta.createSVGPoint();
pt.x = evt.clientX; //screen coordinates within svg
pt.y = evt.clientY;
console.log("(klientX:" + pt.x + ",klientY:" + pt.y + ")");
  


// The cursor screen (client) point, translated into svg coordinates - transformation to SVG coordinate space
cursorpt =  pt.matrixTransform(CTM.inverse());  //screen coordinates 
console.log("(svgX:" + cursorpt.x + ",svgY:" + cursorpt.y + ")");


//svgDoc.getElementsByClassName("joj")[0].setAttributeNS(null, "transform","translate(" + kooGraddx[i]+ "," + kooGraddy[i] + ")");
 
polgElement.setAttributeNS(null, "transform","translate(" + kooGraddx[i] + ", " + kooGraddy[i] + ")");
polgElement.setAttributeNS(null, "visibility", "visible");
textTooltipVrijednost.data = evt.target.getAttributeNS(null, "class");             
}
 
function hide(){
      polgElement.setAttributeNS(null, "visibility", "hidden");
}
*/


/* Tooltip pomoću title koji se kreira unutar SVG-a: 
Kreiranje title elementa u svakom circle elementu i dodavanje pripadajućeg teksta
*/
var titleKreiranje = karta.selectAll("g.gradici circle").append("title").text("tooltip"); // Kreiranje title elementa u svakom circle elementu i ispis tooltip tekst

for (var i =0; i<naziviGradova.length; i++){                                     // Ispis odgovarajućeg teksta u title element (nazivi gradova)
      var textNazivaGradova = naziviGradova[i];
      var title = svgDoc.getElementsByTagName("title");
      title[i].innerHTML = textNazivaGradova;                                    // Dohvati tekst u title elementu i zamjeni ga s vrijednostima iz nazivaGradova
      
}



/* Povećanje kružića većih gradova na hover */
var gradovi = karta.selectAll("#Veći_gradovi circle");
gradovi.on("mouseover", function(){d3.select(this).attr("r", 20);})
       .on("mouseout", function(){d3.select(this).attr("r", 7);});

/* Povećanje kružića glavnih gradova županije na hover  - napraviti da se povećava skupa s tekstom!
var zupGradovi = karta.selectAll("#Županijski_centri circle");
zupGradovi.on("mouseover", function(){d3.select(this).attr("r", 20);})
          .on("mouseout", function(){d3.select(this).attr("r", 7);});
*/

/* Povećanje naziva glavnih gradova županija na hover */
ZuGraNaziv.on("mouseover", function(){d3.select(this).style("font-size", "20px");})
          .on("mouseout", function(){d3.select(this).style("font-size", "12px");}); 


/* Zoom to županije */
var zupanije = svgDoc.getElementsByClassName("pol");
var viewBox = svgKarta.getAttribute("viewBox");
var pop = karta.selectAll("g.pol");
var poc = pop.node().getBBox();
var pop1 = karta.select("#zombi")

var istra = svgDoc.getElementsByClassName("i");
var istraB = istra[0].getBBox();

var medj = svgDoc.getElementsByClassName("m");
var medjB = medj[0].getBBox();
var viewBoxStringI = `${istraB.x} ${istraB.y} ${istraB.width} ${istraB.height}`;
var viewBoxStringM = `${medjB.x} ${medjB.y} ${medjB.width} ${medjB.height}`;
//svgKarta.setAttributeNS(null,"viewBox",viewBoxStringI);


var baseWidth = 1400;
var baseHeight = 960;
var cx;
var cy;
var scale;
var centroid;
pop.on("click", function(){
      var bbox = this.getBBox();
                       
      zoomX = -bbox.x;
      zoomY = -bbox.y;
      scale = Math.min( baseWidth / bbox.width, baseHeight / bbox.height);
      x = (-bbox.x-bbox.width)/2*scale
      y = (-bbox.y-bbox.height)/2*scale
      translate = [baseWidth / 2 - scale * x, baseHeight / 2 - scale * y];
      centroid = [bbox.x + bbox.width/2, bbox.y + bbox.height/2];

  // set a transform on the parent group element
  karta.select("#zombi")
      .attr("transform", "scale(" + scale + " )" + "translate(" + zoomX + "," + zoomY + ")");
      
})







/*
 var selected = false;
 
 var zoom = function (e){
      

      if (e.target === selected){
          svgKarta.setAttributeNS(null,"viewBox", viewBox);
          selected = false;     
      }


      else {
            selected = e.target.parentNode;
                      
            // Select element
            for (let i = 0; i < zupanije.length; i++) {
            var ZupBB = zupanije[i].getBoundingClientRect();
            var viewBoxString = `${ZupBB.x} ${ZupBB.y} ${ZupBB.width}  ${ZupBB.height}`;
            svgKarta.setAttributeNS(null,"viewBox", viewBoxString);
              
          }}
      
      }
 */     

/*
var selected = false;
var zoomTo = function(e){
      if (e.target === selected) {
            // Deselect element
            svgKarta.setAttribute("viewBox", "0 0 1400 960");
            selected = false;
          } else {
            // Select element
            selected = e.target.parentNode;
            for (let i = 0; i < zupanije.length; i++) {
                  var ZupBB = zupanije[i].getBoundingClientRect();
                  var viewBoxString = `${ZupBB.x} ${ZupBB.y} ${ZupBB.width}  ${ZupBB.height}`;
                  svgKarta.setAttributeNS(null,"viewBox", viewBoxString);
          }
      }
}

*/
 


      

/*    
for (let i = 0; i < zupanije.length; i++) {
      var ZupBB = zupanije[i].getBoundingClientRect();
      var x = Math.round( `${ZupBB.x}`);
      var y = Math.round( `${ZupBB.y}`);
      var w = Math.round( `${ZupBB.width}`);
      var h = Math.round( `${ZupBB.height}`);
      var viewBoxString = "" + x + " " + y + " " + width + " " + height + ""
      svgKarta.setAttributeNS(null,"viewBox",viewBoxString);
}        
*/
/*
var selected = false;
var zoomToZupanija = function(e){
      if (e.target === selected){
          svgKarta.setAttributeNS(null,"viewBox", viewBox);
          selected = false;     
      }


      else {
            selected = e.target;
                      
            // Select element
            for (let i = 0; i < zupanije.length; i++) {
            var ZupBB = zupanije[i].getBoundingClientRect();
            var x = Math.round( `${ZupBB.x}`);
            var y = Math.round( `${ZupBB.y}`);
            var w = Math.round( `${ZupBB.width}`);
            var h = Math.round( `${ZupBB.height}`);
            var viewBoxString = "" + x + " " + y + " " + w + " " + h + ""
            //var viewBoxString = `${ZupBB.x} ${ZupBB.y} ${ZupBB.width}  ${ZupBB.height}`;
            svgKarta.setAttributeNS(null,"viewBox", viewBoxString);
              
          }}
      
      }
*/
/*
for (let i =0; i<zupanije.length; i++){
zupanije[i].addEventListener("click", zoom);
}
*/




 /*
  // Add all mouse events listeners fallback
  svgKarta.addEventListener('mousedown', onPointerDown); // Pressing the mouse
      svgKarta.addEventListener('mouseup', onPointerUp); // Releasing the mouse
      svgKarta.addEventListener('mouseleave', onPointerUp); // Mouse gets out of the SVG area
      svgKarta.addEventListener('mousemove', onPointerMove); // Mouse is moving
  
  

// This function returns an object with X & Y values from the pointer event
function getPointFromEvent (event) {
  var point = {x:0, y:0};
  point.x = event.clientX;
  point.y = event.clientY; 
  console.log(point); 
  return point;
  //return point;
}

// This variable will be used later for move events to check if pointer is down or not
var isPointerDown = false;

// This variable will contain the original coordinates when the user start pressing the mouse or touching the screen
var pointerOrigin = {
  x: 0,
  y: 0
};

// Function called by the event listeners when user start pressing/touching
function onPointerDown(event) {
  isPointerDown = true; // We set the pointer as down
  
  // We get the pointer position on click/touchdown so we can get the value once the user starts to drag
  var pointerPosition = getPointFromEvent(event);
  pointerOrigin.x = pointerPosition.x;
  pointerOrigin.y = pointerPosition.y;
}

// We save the original values from the viewBox
var viewBox = {
  x: 0,
  y: 0,
  width: 1400,
  height: 960
};

// The distances calculated from the pointer will be stored here
var newViewBox = {
  x: 0,
  y: 0
};

var lo = svgKarta.getBoundingClientRect().width;
console.log(lo);
// Calculate the ratio based on the viewBox width and the SVG width
var ratio = viewBox.width / ZupBB.width;
window.addEventListener('resize', function() {
  ratio = viewBox.width / ZupBB.width;
  console.log(ratio);
});

// Function called by the event listeners when user start moving/dragging
function onPointerMove (event) {
  // Only run this function if the pointer is down
  if (!isPointerDown) {
    return;
  }
  // This prevent user to do a selection on the page
  event.preventDefault();

  // Get the pointer position
  var pointerPosition = getPointFromEvent(event);

  // We calculate the distance between the pointer origin and the current position
  // The viewBox x & y values must be calculated from the original values and the distances
 
  newViewBox.x = viewBox.x - ((pointerPosition.x - pointerOrigin.x) * ratio);
  newViewBox.y = viewBox.y - ((pointerPosition.y - pointerOrigin.y) * ratio);
  console.log(newViewBox.x);
  
  // We create a string with the new viewBox values
  // The X & Y values are equal to the current viewBox minus the calculated distances
  var viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`;
  // We apply the new viewBox values onto the SVG
  svgKarta.setAttribute('viewBox', viewBoxString);
  
  
}

function onPointerUp() {
  // The pointer is no longer considered as down
  isPointerDown = false;

  // We save the viewBox coordinates based on the last pointer offsets
  viewBox.x = newViewBox.x;
  viewBox.y = newViewBox.y;
}
*/

    