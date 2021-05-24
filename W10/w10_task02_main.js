d3.csv("https://214x112x-nakashima.github.io/InfoVis2021/W06/phisycal.csv")
    .then( data => {
        data.forEach( d => { d.height = +d.height; d.weight = +d.weight });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 512,
            margin: {top:40, right:10, bottom: 50, left:50}
        };

        const scatter_plot = new ScatterClass( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });
