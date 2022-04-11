let map = L.map('mymap').setView([40,-95], 5);

let osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

//initialize svg to add to map
L.svg({clickable:true}).addTo(map)

circlesLayer = L.layerGroup().addTo(map);
circlesLayer.clearLayers()


d3.csv("data/finalmapdata.csv").then(function(data){
  data.forEach(function(d){
  let circle = L.circle([d.lat, d.long], 7000, {
        color: '#fd8d3c',
        weight: 2,
        fillColor: '#fecc5c',
          fillOpacity: 0.5
          })
    let txt = "Facility Name: "+d.FacilityName 
    +"<br>City: "+ d.City
    +"<br> Require paperback book: " + d.only_paperback
    +"<br> Good with used book: " + d.condition_good_used_okay
    +"<br> Require bundle: " + d.bundle
    +"<br> Good with hardcover book: " + d.hardcover_okay
    circle.bindPopup(txt)
    circlesLayer.addLayer(circle) })});

  


