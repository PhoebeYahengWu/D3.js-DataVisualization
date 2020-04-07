var pie = new d3pie("pieChart", {

  "data": {
  
      "content": [
        {
            "label": "Python",
            "value": 30.61	
        },
        {
            "label": "Java",
            "value": 18.45
        },
        {
            "label": "JavaScript",
            "value": 7.91	
        },
        {
            "label": "C#",
            "value": 7.27
        },
        {
            "label": "PHP",
            "value": 6.07
        },
        {
            "label": "C/C++",
            "value": 5.76
        },
        {
            "label": "R",
            "value": 3.8
        },
        {
            "label": "Swift",
            "value": 2.23
        },
        {
            "label": "TypeScript",
            "value": 1.85
        },
        {
            "label": "Other Languages",
            "value": 16.05
        }

    ]
  
   }
  });


  // most popular technology

var svg2 = d3.select("#svg2"),
margin = {top: 20, right: 20, bottom: 30, left: 80},
width = +svg2.attr("width") - margin.left - margin.right,
height = +svg2.attr("height") - margin.top - margin.bottom;

var tooltip = d3.select("body").append("div").attr("class", "toolTip"); 

var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([height, 0]);




var g = svg2.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("mostPopularTech.json", function(error, data) {
  if (error) throw error;

  data.sort(function(a, b) { return a.value - b.value; });

  x.domain([0, d3.max(data, function(d) { return d.value; })]);
  y.domain(data.map(function(d) { return d.area; })).padding(0.1);

  g.append("g")
      .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d / 1) + "%"; }).tickSizeInner([-height]));

  g.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y));

  g.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", y.bandwidth())
      .attr("y", function(d) { return y(d.area); })
      .attr("width", function(d) { return x(d.value); })
      .on("mouseenter", function(d){
          tooltip
            .style("left", d3.event.pageX - 50 + "px")
            .style("top", d3.event.pageY - 70 + "px")
            .style("display", "inline-block")
            .html((d.area) + "<br>" + (d.value) + "%");
      })
      .on("mouseout", function(d){ tooltip.style("display", "none");});
});



// time line
$(window).scroll(function(){				 
	$('.container p').each(function(){
    	var scrollTop     = $(window).scrollTop(),
        	elementOffset = $(this).offset().top,
       		distance      = (elementOffset - scrollTop),
			    windowHeight  = $(window).height(),
			    breakPoint    = windowHeight*0.9;

			if(distance > breakPoint) {
				$(this).addClass("more-padding");	
			}  if(distance < breakPoint) {
				$(this).removeClass("more-padding");	
			}
	});
});


var ctx = document.getElementById("myChart").getContext('2d');


var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["2017", "2018", "2019", "2020"],
        datasets: [{
            label: 'Python', // Name the series
            data: [41000, 46000, 61818,	73733], // Specify the data values array
            fill: false,
            borderColor: '#7CB9D8', // Add custom color border (Line)
            backgroundColor: '#7CB9D8', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
        },
        {
            label: 'Java', // Name the series
            data: [68000, 62000, 65986,	69410], // Specify the data values array
            fill: false,
            borderColor: '#AE709C', // Add custom color border (Line)
            backgroundColor: '#AE709C', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
        },
        {
            label: 'JavaScript', // Name the series
            data: [40000, 38000, 38018,	56499], // Specify the data values array
            fill: false,
            borderColor: '#FCA147', // Add custom color border (Line)
            backgroundColor: '#FCA147', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
        },
        {
            label: 'C++', // Name the series
            data: [33000, 31000, 36798,	41026], // Specify the data values array
            fill: false,
            borderColor: '#42B9B5', // Add custom color border (Line)
            backgroundColor: '#42B9B5', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
        },
        {
            label: 'C#', // Name the series
            data: [28000, 27000, 27521,	31929], // Specify the data values array
            fill: false,
            borderColor: '#768193', // Add custom color border (Line)
            backgroundColor: '#768193', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
        }]
    },
    options: {
      responsive: false, // Instruct chart js to respond nicely.
      maintainAspectRatio: true // Add to prevent default behaviour of full-width/height 
    }
});