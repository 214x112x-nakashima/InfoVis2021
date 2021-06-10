d3.json("https://214x112x-nakashima.github.io/InfoVis2021/W15/japan.geojson")
    .then( data =>{



      var config = {
          parent: '#drawing_region_prefplot',
          width: 600,
          height: 600,
          scale:1200, //地図のスケール
          margin: {top:10, right:10, bottom:50, left:50}
      };

      d3.csv("https://214x112x-nakashima.github.io/InfoVis2021/W15/store.csv")
          .then( data =>{
            data2 = data;
            input_data.forEach( d => {
                d.seven = +d.seven;
                d.lawson = +d.lawson;
                d.family = +d.family;
          }


      const japan_plot = new DrawClass( config, data, data2 );
      japan_plot.update();


    })
    .catch( error => {
        console.log( error );
    });
