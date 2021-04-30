d3.csv("https://214x112x-nakashima.github.io/InfoVis2021/W04/data.csv")
    .then( data => {
        // Convert strings to numbers
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });
        ShowScatterPlot(data);
    })
    .catch( error => {
        console.log( error );
    });

function ShowScatterPlot( data ) {
    const width = 256;
    const height = 256;
    const margin = {top: 10, right: 10, bottom: 20, left: 10};
    var svg = d3.select("body").append("svg")
        .attr('width', width)
        .attr('height', height);

  svg.append("span",display="inline-block")
      .style("vertical-align","middle")
      .text("aaaaa");

    var xscale_m = d3.scaleLinear()
        .domain( [d3.min(data, d => d.x), d3.max(data, d => d.x)] )
        .range( [0, width - margin.left - margin.right ] );

    var yscale_m = d3.scaleLinear()
        .domain( [d3.min(data, d => d.y), d3.max(data, d => d.y)] )
        .range( [0, height - margin.top - margin.bottom] );

    var xscale = d3.scaleLinear()
        .domain( [d3.min(data, d => d.x), d3.max(data, d => d.x)] )
        .range( [margin.left*2 , width - (margin.left*2) - (margin.right*2) ] );

    var yscale = d3.scaleLinear()
        .domain( [d3.min(data, d => d.y), d3.max(data, d => d.y)] )
        .range( [margin.top*2, height - (margin.bottom*2) - (margin.top*2) ] );

    var xaxis = d3.axisBottom( xscale_m )
        .ticks(0);

    var yaxis = d3.axisLeft( yscale_m )
        .ticks(6);

    svg.append('g',display="inline-block")
        .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
        .call( xaxis );

    svg.append('g',display="inline-block")
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call( yaxis );

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr('transform', `translate(${margin.left + margin.left}, ${margin.top+margin.top})`)
        .attr("cx", d => xscale(d.x))
        .attr("cy", d => (height-(margin.bottom*2)-(margin.top*2)-yscale(d.y)))
        .attr("r", d => d.r);
};
