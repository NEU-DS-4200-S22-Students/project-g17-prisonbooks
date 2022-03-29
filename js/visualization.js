// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {

  console.log('Hello, world!');




  // BAR CHART - TOP 15 DONORS

  //Define data

// Probably a better idea is to read this in
let data = [
  {donor:"Kieran Mcgrath Household",count:215},
  {donor:"Chad Mohler Household",count:196},
  {donor:"Anonymous Household",count:119},
  {donor:"Anonymous Anonymous Household",count:107},
  {donor:"Margaret Witham Household",count:103},
  {donor:"Susan D Foster Household",count:82},
  {donor:"Lori Shemanski Household",count:77},
  {donor:"Jennifer Hartwell Household",count:73},
  {donor:"Ann Crowley Household",count:71},
  {donor:"Arthur Clark Household",count:68},
  {donor:"Mark Duske Household",count:65},
  {donor:"Anna Rothman Household",count:62},
  {donor:"Network Good Household",count:62},
  {donor:"Vicki Coffman Household",count:54},
  {donor:"Katryna Hadley Household",count:52}
];

// Create SVG
let
  width = 800,
  height = 600;
  
let margin = {
  top: 40,
  bottom: 30,
  left: 30,
  right: 30
};

let svg = d3
  .select('body')
  .append('svg')
    .attr('width', width)
    .attr('height', height + 140)
    .style('background', '#c5e1e6');

// Define Scales
let yScale = d3.scaleLinear()
  .domain([0, 250]) // make this dynamic
  .range([height - margin.bottom, margin.top]);

let xScale = d3.scaleBand()
  .domain(
    data.map(function(d) {
      return d.donor;
    })
  )
  .range([margin.left, width - margin.right - 10])
  .padding(0.35);

//Draw Axes
let yAxis = svg
  .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft().scale(yScale));

//Add label
yAxis
  .append('text')
    .attr('y', 30)
    .attr('x', 20)
    .style('stroke', 'black')
    .text('Count');

let xAxis = svg
  .append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    //.attr("transform", "rotate(0)")
    .call(d3.axisBottom().scale(xScale));

    // Trying to add some rotation to the x-labels
    xAxis
      .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");
  
//Add label
xAxis
  .append('text')
    .attr('x', width - margin.left + 5)
    .attr('y', -10)
    .style('stroke', 'black')
    .text('Donor');



// adding a div that is not visible now
var div = d3.select("body").append("div")
  .attr("class", "tooltip-bar")
  .style("opacity", 0);



//Draw bars
let bar = svg
  .selectAll('rect')
    .data(data)
  .enter()
  .append('rect')
    .attr('x', function(d) {
      return xScale(d.donor);
    })
    .attr('y', function(d) {
      return yScale(d.count);
    })
    .attr('width', xScale.bandwidth())
    .attr('fill', 'steelblue')
    .attr('height', function(d) {
      return height - margin.bottom - yScale(d.count);
    });

//Interaction
bar
    .on('mouseover', function(d) {
      d3.select(this)
        .transition()
          .delay(200)
          .duration(1000)
        .style('fill', '#69b3a2')
        .attr('opacity', '0.80');
    })

    .on('mouseout', function(d) {
      d3.select(this)
        .transition()
          .delay(200)
          .duration(1000)
        .style('fill', 'steelblue')
        .attr('opacity', '0.9');
    });



})());