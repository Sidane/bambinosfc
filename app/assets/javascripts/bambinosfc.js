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

  var pointColour = d3.scale.category20b();
  var index = 0;

  updateScales(teamPointsByMatchday.length, getHighestPointsInLeague(teamPointsByMatchday));
  console.log(teamPointsByMatchday.length);

  var chart = d3.select('svg')
    .append('g')
    .classed('chart', true)
    .attr('transform', translateString(xPad, yPad));


  $(document).click(function() {
    index = (index + 1) % teamPointsByMatchday.length;
    console.log(index);
    onData(teamPointsByMatchday[index]);
  });


  /*
    Enter
  */
  function onData(data) {
    function teamTransform(d) { return translateString(xScale(index+1), yScale(d.points)); }

    var g = chart.selectAll('g.team')
      .data(data, function(d) { return d.name; })
      .enter()
      .append('g')
      .classed('team', true)
      .attr('transform', teamTransform);

    g.append('circle')
      .attr('fill', function(d, i) { return pointColour(i); })
      .attr('r', 30);

    g.append('text')
      .text(function(d) { return d.name; })
      .attr('x', function(d) { return - this.getBBox().width / 4; })
      .attr('y', function(d) { return this.getBBox().height / 4; })
      .style({ 'font-family': 'Helvetica', 'fill': '#fff', 'font-size': '10px' });

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
    return d3.max(data.pop(), function(d) { return d.points; });
  }

  function updateScales(xMax, yMax) {
    xScale = d3.scale.ordinal()
              .domain(range(1, xMax))
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
});
