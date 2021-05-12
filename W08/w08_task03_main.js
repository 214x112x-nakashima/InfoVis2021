d3.csv("https://214x112x-nakashima.github.io/InfoVis2021/W08/food.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
        };

        const piechart_plot = new PieChartPlot( config, data );
        piechart_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class PieChartPlot{

  constructor( config, data ) {
      this.config = {
          parent: config.parent,
          width: config.width || 256,
          height: config.height || 256,
      }
      this.data = data;
      this.init();
  }

  init() {
      let self = this;

      self.svg = d3.select( self.config.parent )
          .attr('width', self.config.width)
          .attr('height', self.config.height);

      self.chart = self.svg.append('g')
          .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

      self.pie = d3.pie()

      self.arc = d3.arc()
          .innerRadius(0)
          .outerRadius(Math.min( self.config.width, self.config.height ) / 2);

 }

  update() {
      let self = this;

      self.pie.value( d => d.value );
      //self.arc.outerRadius(self.config.radius);

      self.render();
  }

  render() {
      let self = this;

      self.chart.selectAll("pie")
          .data( self.pie(self.data) )
          .enter()
          .append("path")
          .attr("d", self.arc )
          .attr("fill", 'black' )
          .attr("stroke", 'white' )
          .style('stroke-width', '2px');

  }

}
