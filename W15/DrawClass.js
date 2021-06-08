class DrawClass{

  constructor( config, data ) {
      this.config = {
          parent: config.parent, //body.svg
          width: config.width || 600,
          height: config.height || 600,
          scale: config.scale || 1200,
          margin: config.margin || {top:10, right:10, bottom:10, left:10}
      }
      this.data = data;
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

      self.pref_name = d=>d.features.properties.pref_j;

      self.render();
  }

  render() {
      let self = this;

      let prefs = self.chart.selectAll("path")
          .data(self.data.features)
          .join("path");

      prefs
         .attr("d", self.path)
         .style("stroke", "black")
         .style("stroke-width", 0.25)
         .style("fill", "white")

      prefs
        .on('mouseover', (e,d) => {
            d3.select('#tooltip')
                .style('opacity', 1)
                .html(`<div class="tooltip-label">${d.properties.perf_j}</div>`);
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
