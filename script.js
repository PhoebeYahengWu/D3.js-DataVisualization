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
            "label": "TypeScript",
            "value": 1.85
        },
        {
            "label": "Others",
            "value": 22.08
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

