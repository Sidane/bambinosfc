// Bambinos FC


jQuery(function($) {
  var svgWidth = 1200;
  var svgHeight = 800;

  var xPad = 30;
  var yPad = 30;

  var canvasWidth = svgWidth - (xPad*2);
  var canvasHeight = svgHeight - (yPad*2);

  var xScale, yScale;

  var svg = d3.select("#bambinos_fc")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

  // var data = [ { x: 0, y: 100 }, { x: 100, y: 300 }, { x: 100, y: 500 } ];

  var pointColour = d3.scale.category10();
  var index = 0;

  updateScales(teamPointsByMatchday.length, getHighestPointsInLeague(teamPointsByMatchday));

  var chart = d3.select('svg')
    .append('g')
    .classed('chart', true)
    .attr('transform', translateString(xPad, yPad));


  $(document).click(function() {
    index = (index + 1) % teamPointsByMatchday.length;
    onData(teamPointsByMatchday[index]);
    onLineData(createLineData(teamPointsByMatchday.slice(0, index+1)));
  });


  lineData = createLineData(teamPointsByMatchday);

  var line = d3.svg.line()
    .interpolate("linear")
    .x(function(d) { return xScale(d.match) + xScale.rangeBand()/2; })
    .y(function(d) { return yScale(d.points); });

  function onLineData(data) {
    var team = chart.selectAll(".line")
      .data(data, function(d) { return d.name; })
      .enter().append("g")
        .attr("class", "line");

    team.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d, i) { return pointColour(i); })
      .style("stroke-width", "4px")
      .style("fill", "transparent");

    d3.selectAll("path").data(data, function(d) { return d.name; }).transition().ease("bounce").duration(1000).attr("d", function(d) { return line(d.values); });
  }

  /*
    Enter
  */
  function onData(data) {
    function teamTransform(d) { return translateString(xScale(index) + xScale.rangeBand()/2, yScale(d.points)); }

    var g = chart.selectAll('g.team')
      .data(data, function(d) { return d.name; })
      .enter()
      .append('g')
      .classed('team', true)
      .attr('transform', teamTransform);

    g.append('circle')
      .attr('fill', function(d, i) { return pointColour(i); })
      .attr('opacity', 0.7)
      .attr('r', 30);

    g.append('text')
      .text(function(d) { return d.name; })
      .attr('x', function(d) { return - this.getComputedTextLength() / 4; })
      .attr('y', function(d) { return this.getBBox().height / 4; })
      .style({
        'font-family': 'Helvetica',
        'font-size': '10px',
        'font-weight': 'bold'
      })
      .style('fill', function(d, i) { return Colors.complement(pointColour(i)); });

    chart
      .append('g')
      .attr('transform', translateString(0, canvasHeight))
      .classed('axis', true)
      .attr('id','xAxis')
      .call(makeXAxis);

    chart
      .append('g')
      .attr('id','yAxis')
      .classed('axis', true)
      .call(makeYAxis);


    /*
      Update
    */
    d3.selectAll('g.team')
      .transition()
      .duration(1500)
      .attr('transform', teamTransform);
  }

  onData(teamPointsByMatchday[index]);

  function getHighestPointsInLeague(data) {
    return d3.max(data[data.length-1], function(d) { return d.points; });
  }

  function updateScales(xMax, yMax) {
    xScale = d3.scale.ordinal()
              .domain(range(0, xMax-1))
              .rangeBands([0, canvasWidth]);

    yScale = d3.scale.linear()
              .domain([yMax, 0])
              .range([0, canvasHeight]);
  }

  function makeXAxis(s) {
    s.call(d3.svg.axis()
      .scale(xScale)
      .orient("bottom"));
  }

  function makeYAxis(s) {
    s.call(d3.svg.axis()
      .scale(yScale)
      .orient("left"));
  }

  function translateString(x, y) {
    return 'translate(' + x + ',' + y + ')';
  }

  function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
      foo.push(i);
    }
    return foo;
  }

  function createLineData(data) {
    var lineData = [];
    var teamNames = data[0].map(function(team) { return team.name; });

    teamNames.forEach(function(teamName) {
      var values = [];

      data.forEach(function(matchday, index) {
        matchday.forEach(function(team) {
          if (team.name != teamName) { return; }
          values.push({match: index, points: team.points});
        });
      });

      lineData.push({name: teamName, values: values});
    });

    return lineData;
  }
});
