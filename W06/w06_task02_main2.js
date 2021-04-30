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
    const width = 512;
    const height = 512;
    const margin = {top: 50, right: 50, bottom: 100, left: 50};
    var svg = d3.select("body").append("svg")
        .attr('width', width)
        .attr('height', height);

    svg.append("text")
        .attr("x",60)
        .attr("y",30)
        .attr("font-size",30)
        .attr("font-weight","bold")
        .text("Physical measurement")

   svg.append("text")
       .attr("x",40)
       .attr("y",80)
       .attr("transform", "translate(-30,300) rotate(-90)")
       .text("Weight")

   svg.append("text")
       .attr("x",250)
       .attr("y",450)
       .text("Height")

   var xscale = d3.scaleLinear()
       .domain( [d3.min(data, d => d.x), d3.max(data, d => d.x)] )
       .range( [0, width - margin.left - margin.right ] );

   var yscale = d3.scaleLinear()
       .domain( [d3.min(data, d => d.y), d3.max(data, d => d.y)] )
       .range( [0, height - margin.top - margin.bottom] );


    svg.append("g")
        .attr("class","x_axis")
        .attr("transform","translate(" + [80,height-margin.bottom].join(",")+")")
        .call(d3.axisBottom(xscale).ticks(10));

    svg.append("g")
        .attr("class","y_axis")
        .attr("transform","translate(" + [80,margin.top].join(",")+")")
        .call(d3.axisLeft(yscale).ticks(10));




};
