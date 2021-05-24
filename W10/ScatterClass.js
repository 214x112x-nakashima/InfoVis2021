class ScatterClass{

  constructor( config, data ) {
      this.config = {
          parent: config.parent,
          width: config.width || 256,
          height: config.height || 128,
          margin: config.margin || {top: 10, right: 10, bottom: 20, left: 10}
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
          .range( [0, self.config.width - self.config.margin.left - self.config.margin.right] );

      self.yscale = d3.scaleLinear()
          .range( [self.config.height - self.config.margin.top - self.config.margin.bottom, 0] );

      self.xaxis = d3.axisBottom( self.xscale )
          .ticks(10)
          .tickSizeOuter(0);

      self.yaxis = d3.axisLeft( self.yscale )
          .ticks(5)
          .tickSizeOuter(0);

      self.xaxis_group = self.chart.append('g')
          .attr('transform', `translate(0,${self.config.height - self.config.margin.top - self.config.margin.bottom })`);

      self.yaxis_group = self.chart.append('g')
        //  .attr('transform', `translate(0,${self.config.margin.top})`);

      self.tooltip = self.svg.append("div").attr("class", "tooptip")
  }

  update() {
      let self = this;

      self.xscale.domain( [140,190] );

      self.yscale.domain( [40,65]);

      self.render();
  }

  render() {
      let self = this;

      self.svg.append("text")
          .attr("x",110)
          .attr("y",30)
          .attr("font-size",30)
          .attr("font-weight","bold")
          .text("Physical measurement")

     self.svg.append("text")
         .attr("x",30)
         .attr("y",60)
         .attr("transform", "translate(-40,300) rotate(-90)")
         .text("Weight")

     self.svg.append("text")
         .attr("x",260)
         .attr("y",500)
         .text("Height")

      self.svg.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`)
            .attr("cx", d => self.xscale(d.height))
            .attr("cy", d => self.yscale(d.weight))
            .attr("r", 10)
            .on('mouseover', (e,d) => {
                  d3.select('#tooltip')
                  .style('opacity', 1)
                  .html(`<div class="tooltip-label">Height/Weight</div>(${d.height}, ${d.weight})`);

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
            //.attr("point

      self.xaxis_group
          .call( self.xaxis );

      self.yaxis_group
          .call( self.yaxis );


  }

}
