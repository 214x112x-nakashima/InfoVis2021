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

      self.radius = Math.min( self.config.width, self.config.height ) / 2

      self.svg = d3.select( self.config.parent )
          .attr('width', self.config.width)
          .attr('height', self.config.height);

      self.chart = self.svg.append('g')
          .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

      self.pie = d3.pie()

      self.arc = d3.arc()
          .innerRadius(self.radius - 70)
          .outerRadius(self.radius);

      self.text = d3.arc()
          .innerRadius(self.radius - 30)
          .outerRadius(self.radius - 30);



 }

  update() {
      let self = this;

      self.pie.value( d => d.value );

      self.render();
  }

  render() {
      let self = this;

      self.chart.selectAll("pie")
          .data( self.pie(self.data) )
          .enter()
          .append("path")
          .attr("d", self.arc )
          .attr("fill", d => d.data.color)
          .attr("stroke", 'white' )
          .style('stroke-width', '2px')

      self.chart.selectAll("pie")
          .data( self.pie(self.data) )
          .enter()
          .append("text")
          .attr("fill","white")
          .attr("transform",function(d) { return "translate(" + self.text.centroid(d) + ")"; })
          .attr("dy","5px")
          .attr("font","10px")
          .attr("text-anchor","middle")
          .text(d => d.data.label );


  }

}
