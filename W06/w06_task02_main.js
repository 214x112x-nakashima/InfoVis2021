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
    const width = 512;
    const height = 512;
    const margin = {top: 50, right: 50, bottom: 100, left: 50};
    var svg = d3.select("body").append("svg")
        .attr('width', width)
        .attr('height', height);

    svg.append("text")
        .attr("x",110)
        .attr("y",30)
        .attr("font-size",30)
        .attr("font-weight","bold")
        .text("Physical measurement")

   svg.append("text")
       .attr("x",40)
       .attr("y",80)
       .attr("transform", "translate(-40,300) rotate(-90)")
       .text("Weight")

   svg.append("text")
       .attr("x",260)
       .attr("y",460)
       .text("Height")

   var xscale = d3.scaleLinear()
       .domain([140,190])
       .range( [0, width - margin.left - margin.right] );

   var yscale = d3.scaleLinear()
       .domain( [40,65] )
       .range( [height - margin.top - margin.bottom, 0] );


    svg.append("g")
        .attr("class","x_axis")
        .attr("transform","translate(" + [80,height-margin.bottom].join(",")+")")
        .call(d3.axisBottom(xscale).ticks(10));

    svg.append("g")
        .attr("class","y_axis")
        .attr("transform","translate(" + [80,margin.top].join(",")+")")
        .call(d3.axisLeft(yscale).ticks(5));

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr('transform', `translate(80, ${margin.top})`)
        .attr("cx", d => xscale(d.height))
        .attr("cy", d => yscale(d.weight))
        .attr("r", 10)
        .attr("pointer-events",fill)




};
