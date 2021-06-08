class DrawClass{

  constructor( config, data ) {
      this.config = {
          parent: config.parent, //body.svg
          width: config.width || 600,
          height: config.height || 600,
          scale: config.scale || 1200
      }
      this.data = data;
      this.init();
  }

  init() {
      let self = this;

      self.svg = d3.select( self.config.parent)
          .attr('width', self.config.width)
          .attr('height', self.config.height);

      self.projection = d3.geoMercator()
           .center([ 136.0, 35.6 ])
           .translate([self.config.width/2, self.config.height/2])
           .scale(self.config.scale);

      self.path = d3.geoPath().projection(self.projection);

  }

  update() {
      let self = this;

      self.render();
  }

  render() {
      let self = this;

        self.svg.selectAll("path")   //都道府県の領域データをpathで描画
           .data(self.data.features)
           .enter()
           .append("path")
           .attr("d", self.path)
           .style("stroke", "black")
           .style("stroke-width", 0.25)
           .style("fill", "white")
           .on('mouseover', (item, any) =>{

             const group = self.svg.append('g').attr('id','label-group');

             const label = item.properties;

             const rectElement = group
                    .append(`rect`)
                    .attr(`id`, `label-rect`)
                    .attr(`stroke`, `#666`)
                    .attr(`stroke-width`, 0.5)
                    .attr(`fill`, `#fff`);

             const textElement = group
                     .append('text')
                     .attr('id','label-text')
                     .text(label)

             const padding = { x: 5, y: 0 };

             const textSize = textElement.node().getBBox();

             rectElement
               .attr(`x`, textSize.x - padding.x)
               .attr(`y`, textSize.y - padding.y)
               .attr(`width`, textSize.width + padding.x * 2)
               .attr(`height`, textSize.height + padding.y * 2);

             // マウス位置の都道府県領域を赤色に変更
             //d3.select('label-text').attr(`fill`, `#CC4C39`);
             //d3.select('label-text').attr(`stroke-width`, `1`);
           })


  }



}
