d3.csv("https://214x112x-nakashima.github.io/InfoVis2021/W08/food.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:10, right:10, bottom:20, left:60}
        };

        const barchart_plot = new BarChartPlot( config, data );
        barchart_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class BarChartPlot{

  constructor( config, data ) {
      this.config = {
          parent: config.parent,
          width: config.width || 256,
          height: config.height || 128,
          margin: config.margin || {top:10, right:10, bottom:10, left:10}
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
          .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

      self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
      self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

      self.xscale = d3.scaleLinear()
          .range( [0, self.inner_width] );

      self.yscale = d3.scaleBand()
          .range( [0, self.inner_height] )
          .paddingInner(0.1);

      self.xaxis = d3.axisBottom( self.xscale )
          .ticks(5)
          .tickSizeOuter(0);

      self.yaxis = d3.axisLeft( self.yscale )
          .tickSizeOuter(0);

      self.xaxis_group = self.chart.append('g')
          .attr('transform', `translate(0, ${self.inner_height})`);

      self.yaxis_group = self.chart.append('g')
  }

  update() {
      let self = this;

      const xmax = d3.max( self.data, d => d.value );
      self.xscale.domain( [0, xmax] );

      self.yscale.domain( self.data.map(d => d.label) );

      self.render();
  }

  render() {
      let self = this;

      self.chart.selectAll("rect")
          .data(self.data)
          .enter()
          .append("rect")
          .attr("x", 0 )
          .attr("y", d => self.yscale( d.label ) )
          .attr("width", d => self.xscale(d.value) )
          .attr("height", self.yscale.bandwidth())

      self.xaxis_group
          .call( self.xaxis );

      self.yaxis_group
          .call( self.yaxis );
  }

}
