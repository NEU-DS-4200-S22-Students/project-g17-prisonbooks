let map = L.map('mymap').setView([40,-95], 5);

let osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

//initialize svg to add to map
L.svg({clickable:true}).addTo(map)

const overlay = d3.select(map.getPanes().overlayPane)
const svg = overlay.select('svg').attr("pointer-events", "auto")
  
d3.csv('data/data.csv').then(function(data){
  let cities = svg.selectAll('circle')
                  .attr("class", "Dots")
                  .data(data)
                  .enter().append('circle')
                      .attr("id", "dotties")
                      .attr("fill", "steelblue")
                      .attr("stroke", "black")
                      .attr("cx", d =>
                       map.latLngToLayerPoint([d.latitude, d.longitude]).x)
                      .attr("cy", d =>
                       map.latLngToLayerPoint([d.latitude, d.longitude]).y)
                      .attr("r",5)
                      .on('mouseover', function() { //function to add mouseover event
                        d3.select(this).transition() //D3 selects the object we have moused over in order to perform operations on it
                          .duration('150') //how long we are transitioning between the two states (works like keyframes)
                          .attr("fill", "red") //change the fill
                          .attr('r', 10) //change radius
                      })
                      .on('mouseout', function() { //reverse the action based on when we mouse off the the circle
                        d3.select(this).transition()
                          .duration('150')
                          .attr("fill", "steelblue")
                          .attr('r', 5)
                      });
    


// create custom dispatch events
// var dispatch = d3.dispatch("mouseover", "mouseout");

// // create a listener function that change the color of the circle to red upon
// // the yellow square being clicked
// dispatch.on("mouseover", function() {
//   d3.select(this).transition()
//   .duration('150') //how long we are transitioning between the two states (works like keyframes)
//   .attr("fill", "red") //change the fill
//   .attr('r', 10) //change radius
// });

// // listener function that change the color of the rectangle to green
// // if red circle is double-clicked
// dispatch.on("mouseout", function() {
//   d3.select(this).transition()
//   .duration('150')
//   .attr("fill", "steelblue")
//   .attr('r', 5)
// });


// // listener event for rectangle
// cities.on('mouseover', function(){
//   dispatch.call("mouseover")
// });

// cities.on('mouseout', function(){
//   dispatch.call("mouseout")
// })

const update = () => cities
  .attr("cx", d => map.latLngToLayerPoint([d.latitude, d.longitude]).x)
  .attr("cy", d => map.latLngToLayerPoint([d.latitude, d.longitude]).y) 

map.on("zoomend", update)
});

