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

  var data = [ { x: 0, y: 100 }, { x: 100, y: 300 }, { x: 100, y: 500 } ];

  var pointColour = d3.scale.category20b();

  updateScales(Object.keys(teamPointsByMatchday).length, getHighestPointsInLeague(teamPointsByMatchday));

  var chart = d3.select('svg')
    .append('g')
    .classed('chart', true)
    .attr('transform', translateString(xPad, yPad));

  var g = chart.selectAll('circle')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', function(d) { return translateString(d.x, d.y); });

  g.append('circle')
    .attr('fill', function(d, i) { return pointColour(i); })
    .attr('r', 30);

  g.append('text')
    .text('XX')
    .attr('x', function(d) { return - this.getBBox().width / 4; })
    .attr('y', function(d) { return this.getBBox().height / 4; })
    .style({ 'font-family': 'Helvetica', 'fill': '#fff', 'font-size': '10px' });

  chart
    .append('g')
    .attr('transform', translateString(0, canvasHeight))
    .attr('id','xAxis')
    .call(makeXAxis);

  chart
    .append('g')
    .attr('id','yAxis')
    .call(makeYAxis);

  function getHighestPointsInLeague(data) {
    var totals = data[Object.keys(data).sort().pop()];

    var values = [];

    for ( var key in totals ) {
      values.push(totals[key]);
    }

    return d3.max(values);
  }

  function updateScales(xMax, yMax) {
    xScale = d3.scale.ordinal()
              .domain(Object.keys(teamPointsByMatchday))
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
});
