// The Data that we wish to display on our graph, an array of Javascript Objects
var data = [{
    'name':"Europe",'value': 36073
  },{
    'name':"North America",'value': 25526
  },{
    'name':"Asia",'value': 18273
  },{
    'name':"South America",'value': 3459
  },{
    'name':"Africa", 'value': 2850
  },{
    'name':"Australia",'value': 2434
  },{
    'name':"Other",'value': 268
  }];
  

//   var tip = d3.select(".chart-container")
//       .append("div")
//       .attr("class", "tip")
//       .style("position", "absolute")
//       .style("z-index", "10")
//       .style("visibility", "hidden");
  
//   var svg = d3.select("svg").attr("class", "background-style"),
//       margin = {top: 20, right: 20, bottom: 42, left: 60},
//       width = +svg.attr("width") - margin.left - margin.right,
//       height = +svg.attr("height") - margin.top - margin.bottom;
  
//   var x = d3.scaleBand().rangeRound([0, width]).padding(0.05),
//       y = d3.scaleLinear().rangeRound([height, 0]);
  
//   var g = svg.append("g")
//       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  


    
//     x.domain(data.map(function(d) { return d.name; }));
//     y.domain([0, d3.max(data, function(d) { return d.value; })]);
  
//     g.append("g")
//         .attr("class", "axis axis--x")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x))
//      .append("text")
//         .attr("y", 6)
//         .attr("dy", "2.5em")
//         .attr("dx", width/2 - margin.left)
//         .attr("text-anchor", "start")
//         .text("Location");
  
//     g.append("g")
//         .attr("class", "axis axis--y")
//         .call(d3.axisLeft(y).ticks(10))
//       .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", "0.71em")
//         .attr("text-anchor", "end")
//         .text("Amount");
   
  
//     g.selectAll(".bar")
//       .data(data)
//       .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", function(d) { return x(d.name); })
//         .attr("y", function(d) { return y(d.value); })
//         .attr("width", x.bandwidth())
//         .attr("height", function(d) { return height - y(d.value)})
//         .on("mouseover", function(d) {return tip.text(d.value).style("visibility", "visible").style("top", y(d.value) - 13+ 'px' ).style("left", x(d.name) + x.bandwidth() - 12 + 'px')})
//           //.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
//           .on("mouseout", function(){return tip.style("visibility", "hidden");});
//     //    });



var text = "";

var width = 260;
var height = 260;
var thickness = 40;
var duration = 750;

var radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal()
    .domain(data)
    .range(['#1E4D79', '#327194', '#4C8DB3','#77B1D6','#A0C8E1','#D7EAF8','#F2D398']);

var svg = d3.select("#chart1")
.append('svg')
.attr('class', 'pie')
.attr('width', width)
.attr('height', height);

var g = svg.append('g')
.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

var arc = d3.arc()
.innerRadius(radius - thickness)
.outerRadius(radius);

var pie = d3.pie()
.value(function(d) { return d.value; })
.sort(null);

var path = g.selectAll('path')
.data(pie(data))
.enter()
.append("g")
.on("mouseover", function(d) {
      let g = d3.select(this)
        .style("cursor", "pointer")
        .style("fill", "black")
        .append("g")
        .attr("class", "text-group");
 
      g.append("text")
        .attr("class", "name-text")
        .text(`${d.data.name}`)
        .attr('text-anchor', 'middle')
        .attr('dy', '-1.2em');
  
      g.append("text")
        .attr("class", "value-text")
        .text(`${d.data.value}`)
        .attr('text-anchor', 'middle')
        .attr('dy', '.6em');
    })
  .on("mouseout", function(d) {
      d3.select(this)
        .style("cursor", "none")  
        .style("fill", color(this._current))
        .select(".text-group").remove();
    })
  .append('path')
  .attr('d', arc)
  .attr('fill', (d,i) => color(i))
  .on("mouseover", function(d) {
      d3.select(this)     
        .style("cursor", "pointer")
        .style("fill", "black");
    })
  .on("mouseout", function(d) {
      d3.select(this)
        .style("cursor", "none")  
        .style("fill", color(this._current));
    })
  .each(function(d, i) { this._current = i; });


g.append('text')
  .attr('text-anchor', 'middle')
  .attr('dy', '.35em')
  .text(text);