d3.csv("https://214x112x-nakashima.github.io/InfoVis2021/W08/food.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:10, right:10, bottom:20, left:60}
        };

        const barchart_plot = new BarChartClass( config, data );
        barchart_plot.update();

        d3.select('#reverse')
            .on('click', d => {
                data.reverse();
                barchart_plot.update();
            });
    })
    .catch( error => {
        console.log( error );
    });
