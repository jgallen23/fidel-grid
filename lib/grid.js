Fidel.Grid = Fidel.ViewController.extend({
  defaults: {
    paddingX: 0,
    paddingY: 0,
    imageLoadTimeout: 100
  },
  init: function() {
    this.el.css('position', 'relative');
    this.item.css("position", "absolute");

    this.find('img').load(this.proxy(this.imgLoaded));
    $(window).resize(this.proxy(this.processGrid));
    this.processGrid();
  },
  imgLoaded: function() {
    if (this.imageTimeout)
      clearTimeout(this.imageTimeout);
    this.imageTimeout = setTimeout(this.proxy(this.processGrid), this.imageLoadTimeout);
  },
  processGrid: function() {
    this.itemWidth = this.item.width() + (this.paddingX*2);
    this.columnCount = Math.floor(this.el.width()/this.itemWidth);

    var columnHeights = [];
    for (var i = 0, c = this.item.length; i < c; i++) {
      var item = $(this.item[i]);
      var column = i%this.columnCount;

      if (!columnHeights[column])
        columnHeights[column] = 0;

      var h = columnHeights[column];
      columnHeights[column] += item.height() + this.paddingY;

      item.css({
        "top": h+"px",
        "left": (this.itemWidth)*column+"px"
      });
    }
  }
});
