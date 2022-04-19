let map = L.map('mymap').setView([40,-95], 4)

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
        color: d.color_v2,
        weight: 2,z
        fillColor: d.color_v2,
          fillOpacity: 0.5
          })
    let txt = "<b>Facility Name: </b>"+d.FacilityName 
    +"<br><b>City: </b>"+ d.City
    +"<br><b> Require paperback book: </b>" + d.only_paperback
    +"<br><b> Good with used book: </b>" + d.condition_good_used_okay
    +"<br><b> Require bundle: </b>" + d.bundle
    +"<br><b> Good with hardcover book: </b>" + d.hardcover_okay
    circle.bindPopup(txt)
    circlesLayer.addLayer(circle) })});

  


