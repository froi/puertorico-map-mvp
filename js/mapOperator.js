var mapOperator = {
    puertoRico: {},
    pueblos: {},
    tooltip: {},
    youTubeAPIKey: 'AIzaSyA1H0afPg9KoZXsZKr6hTRfir22QwFGNHs',
    init: function() {
      this.tooltip = d3.select('#map').append('div').attr('class', 'tooltip');
      var config = {
      	node: $('#map')[0],
  		tiles: ['pueblos'],
  		size: 'medium',
 		on_ready: mapOperator.bindActions
      };
      this.puertoRico = new AtlasPR(config);
    },

    getPlayListItems: function(playListID) {
      var playListID = 'PL5Mlzwwjsgub3w0W18UFcIn3d998mPqXC'; // @todo -- bye bye once abstracted
      var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' +
      playListID +
      '&key=' +
      this.youTubeAPIKey;

      //return $.ajax({
      $.ajax({
          type: 'GET',
          url: url,
          async: false,
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(res) {
            console.log(res);
          }
      });
    },

    bindActions: function() {
        mapOperator.getPlayListItems('ten');
        var pueblos = mapOperator.puertoRico.svg.selectAll('.pueblos');
        pueblos.on('mousemove', function(d,i){
            var mouse = d3.mouse(mapOperator.puertoRico.svg.node()).map(function(d) { return parseInt(d); });
            mapOperator.tooltip.html('<span id=' + d.properties.NAME + '>Name: ' + d.properties.NAME + '</span>'+
                '<br />' +
                '<div class="video" id=video-' + d.properties.NAME + '>' +
                '<iframe width="100" height="100" src="//www.youtube.com/embed/cHTyUz86fMY?list=PL65XgbSILalV-wInUiERrhjweMlJkukMd" frameborder="0" allowfullscreen></iframe>' +
                '</div>')
                .transition()
                .duration(300)
                .style('visibility', 'visible')
                .style('left', (mouse[0] + 25) + 'px')
                .style('top', mouse[1] + 'px');

        })
        .on('mouseover', function(d, i) {
            d3.select(this).style('stroke-width', 3).style('fill', 'red');
        })
        .on("mouseout",  function(d,i) {
            d3.select(this).style('stroke-width', 2).style('fill', 'white');
            mapOperator.tooltip.style('visibility', 'hidden').html('');
            // tooltip.classed("hidden", true)
        });

    }
}
