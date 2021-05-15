d3.csv("https://214x112x-nakashima.github.io/InfoVis2021/W08/line.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 200,
            margin: {top:20, right:10, bottom:20, left:25}
        };

        const drawing_line = new DrawingLine( config, data );
        drawing_line.update();
    })
    .catch( error => {
        console.log( error );
    });

class DrawingLine{

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

      self.yscale = d3.scaleLinear()
          .range( [self.inner_height,0] )

      self.xaxis = d3.axisBottom( self.xscale )
          .ticks(5);

      self.yaxis = d3.axisLeft( self.yscale )
          .ticks(5);

      self.xaxis_group = self.chart.append('g')
          .attr("class","xaxis")
          .attr('transform', `translate(0, ${self.inner_height})`);

      self.yaxis_group = self.chart.append('g')
          .attr("class","yaxis")

      self.line = d3.line()

  }

  update() {
      let self = this;

      const xmin = d3.min( self.data, d => d.x );
      const xmax = d3.max( self.data, d => d.x );
      self.xscale.domain( [xmin, xmax] );

      const ymin = d3.min( self.data, d => d.y );
      const ymax = d3.max( self.data, d => d.y );
      self.yscale.domain( [ymin, ymax] );

      self.line.x(d => self.xscale(d.x));
      self.line.y(d => self.yscale(d.y));

      self.render();
  }

  render() {
      let self = this;

      self.chart.selectAll("path")
          .data(self.data)
          .enter()
          .append("path")
          .attr("d", self.line(self.data))
          .attr("stroke", 'black')
          .attr('fill', 'none');


      self.xaxis_group
          .call( self.xaxis );

      self.yaxis_group
          .call( self.yaxis );


  }

}
