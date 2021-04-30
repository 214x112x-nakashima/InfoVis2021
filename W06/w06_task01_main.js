d3.csv("https://214x112x-nakashima.github.io/InfoVis2021/W06/phisycal.csv")
    .then( data => {
        // Convert strings to numbers
        data.forEach( d => { d.height = +d.height; d.weight = +d.weight; });
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
        .attr('height', height)

    var xscale_axis = d3.scaleLinear()
        .domain([d3.min(data, d => d.height), d3.max(data, d => d.height)]) //140,190
        .range( [0, width - margin.left - margin.right] );

    var yscale_axis = d3.scaleLinear()
        .domain([d3.min(data, d => d.weight), d3.max(data, d => d.weight)]) //40,65
        .range( [0,height - margin.top - margin.bottom] );

    var xscale = d3.scaleLinear()
        .domain( [0, width - margin.left - margin.right] )
        .range( [margin.left*2, width - (margin.left*2) - (margin.right*2) ] );

    var yscale = d3.scaleLinear()
        .domain( [0,height - margin.top - margin.bottom] )
        .range( [margin.top*2, height - (margin.bottom*2) - (margin.top*2) ] );

    var xaxis = d3.axisBottom( xscale_axis )
        .ticks(0);

    var yaxis = d3.axisLeft( yscale_axis )
        .ticks(0);

    svg.append('g')
        .attr('transform', `translate(${margin.left*2}, ${height - margin.bottom})`)
        .call( xaxis );

    svg.append('g')
        .attr('transform', `translate(${margin.left*2}, ${margin.top})`)
        .call( yaxis );

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr('transform', `translate(${margin.left*2}, ${margin.top})`)
        .attr("cx", d => xscale(xscale_axis(d.height)))
        .attr("cy", d => yscale(yscale_axis(d.weight)))
        .attr("r", 10)
        .attr("pointer-events",fill)
};
