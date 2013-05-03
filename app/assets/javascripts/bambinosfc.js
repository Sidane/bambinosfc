// Bambinos FC


jQuery(function($) {
  var canvasWidth = 1200;
  var canvasHeight = 800;

  var xScale, yScale;

  var svg = d3.select("#bambinos_fc")
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight);

  var data = [ { x: 100, y: 100 }, { x: 100, y: 300 }, { x: 100, y: 500 } ]

  var pointColour = d3.scale.category20b();

  // updateScales(teamPointsByMatchday.length, getHighestPointsInLeague(teamPointsByMatchday));

  var g = d3.select('svg')
    .selectAll('circle')
    .data(teamPointsByMatchday)
    .enter()
    .append('g')
    .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')' });

    g.append('circle')
    .attr('fill', function(d, i) { return pointColour(i) })
    .attr('r', 30);

    g.append('text')
    .text('XX')
    .attr('x', function(d) { return - this.getBBox().width / 4 })
    .attr('y', function(d) { return this.getBBox().height / 4 })
    .style({ 'font-family': 'Helvetica', 'fill': '#fff', 'font-size': '10px' });

    // d3.select('svg')
    //   .append('g')
    //   .attr('id','xAxis')
    //   .call(makeXAxis)

  function getHighestPointsInLeague(data) {
    var totals = data[Object.keys(data).sort().pop()];

    var values = [];

    for ( var key in totals ) {
      values.push(totals[key]);
    }

    return d3.max(values);

  }

  function updateScales(xMax, yMax) {
    xScale = d3.scale.linear()
              .domain([0, xMax])
              .range(30, canvasWidth - 30);

    yScale = d3.scale.linear()
              .domain([0, yMax])
              .range(30, canvasHeight - 30);
  }

  function makeXAxis(s) {
    console.log(xScale,s);
    s.call(d3.svg.axis()
      .scale(xScale)
      .orient("bottom"));
  }


})


