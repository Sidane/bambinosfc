// Bambinos FC
jQuery(function($) {
  var svg = d3.select("#bambinos_fc")
      .append("svg")
      .attr("width", 1200)
      .attr("height", 800);

  var data = [ { x: 100, y: 100 }, { x: 100, y: 300 }, { x: 100, y: 500 } ]

  var pointColour = d3.scale.category20b();

  var g = d3.select('svg')
    .selectAll('circle')
    .data(data)
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


})
