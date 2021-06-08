d3.json("https://214x112x-nakashima.github.io/InfoVis2021/W15/japan.geojson")
    .then( data =>{

      var config = {
          parent: '#drawing_region',
          width: 600,
          height: 600,
          scale:1200 //地図のスケール
      };

      const japan_plot = new DrawClass( config, data );
      japan_plot.update();

    })
    .catch( error => {
        console.log( error );
    });
