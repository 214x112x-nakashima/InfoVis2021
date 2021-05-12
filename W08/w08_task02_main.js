d3.csv("https://214x112x-nakashima.github.io/InfoVis2021/W08/line.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
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
      }
      this.data = data;
      this.init();
  }

  init() {
      let self = this;

      self.svg = d3.select( self.config.parent )
          .attr('width', self.config.width)
          .attr('height', self.config.height);

      self.line = d3.line()

  }

  update() {
      let self = this;

      self.line.x(d => d.x);
      self.line.y(d => d.y);

      self.render();
  }

  render() {
      let self = this;

      self.svg.selectAll("path")
          .data(self.data)
          .enter()
          .append("path")
          .attr("d", self.line(self.data) )
          .attr("stroke", 'black')
          .attr('fill', 'none');
  }

}
