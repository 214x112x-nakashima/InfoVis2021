class DrawClass{

  constructor( config, data, data2 ) {
      this.config = {
          parent: config.parent, //body.svg
          width: config.width || 600,
          height: config.height || 600,
          scale: config.scale || 1200,
          margin: config.margin || {top:10, right:10, bottom:10, left:10}
      }
      this.data = data;
      this.data2 = data2;
      this.init();
  }

  init() {
      let self = this;

      self.svg = d3.select( self.config.parent)
          .attr('width', self.config.width)
          .attr('height', self.config.height);

      self.chart = self.svg.append('g')
          .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`)

      self.projection = d3.geoMercator()
           .center([ 136.0, 35.6 ])
           .translate([self.config.width/2, self.config.height/2])
           .scale(self.config.scale);

      self.path = d3.geoPath().projection(self.projection);

  }

  update() {
      let self = this;

    //  self.pref_name = d=>d.features.properties.pref_j;

      self.render();
  }

  render() {
      let self = this;

      let prefs = self.chart.selectAll("path")
          .data(self.data.features)
          //.append("path")
          //.enter()
          .join("path")


      prefs
        .data(self.data2)
        .attr("d", self.path)
        .attr("stroke", "black")
        .attr("stroke-width", 0.25)
        .attr("fill", d=>d.max);

         //.style("fill""white");

      prefs
        .on('mouseover', (item,any) => {
            d3.select('#tooltip')
                .style('opacity', 1)
                //.text(d);
                .html(`<div class="tooltip-label">${any.properties.pref_j}</div>(150,150)`);

                plotgraph();
        })
        .on('mousemove', (e) => {
            const padding = 10;
            d3.select('#tooltip')
                .style('left', (e.pageX + padding) + 'px')
                .style('top', (e.pageY + padding) + 'px');
        })
        .on('mouseleave', () => {
            d3.select('#tooltip')
                .style('opacity', 0);
        });


  }


}

function store( input_pref ){

  d3.csv("https://214x112x-nakashima.github.io/InfoVis2021/W15/store.csv")
      .then( data =>{

        for(let i=0;i<47;i++){
          console.log(data[i].pref);

          if(input_pref == data[i].pref){
            if(data[i].max == "seven"){
              console.log("red");
              return "red";
            }else if (data[i].max == "lawson") {
              return "blue";
            }else{
              return "green";
            }
          }

        }

      })
      .catch( error => {
          console.log( error );

      });

}


function plotgraph(){

    d3.csv("https://vizlab-kobe-lecture.github.io/InfoVis2021/W12/iris.csv")
       .then(data => {
           input_data = data;
           input_data.forEach( d => {
               d.sepal_length = +d.sepal_length;
               d.sepal_width = +d.sepal_width;
           });;

           const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
           color_scale.domain(['setosa','versicolor','virginica']);

            plot_graph = new PlotGraph( {
               parent: '#drawing_region_graphplot',
               width: 256,
               height: 256,
               margin: {top:10, right:10, bottom:50, left:50},
               xlabel: 'Species',
               cscale: color_scale
           }, input_data );
           plot_graph.update();
       })
       .catch( error => {
           console.log( error );
       });

  }
