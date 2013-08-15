var MediaQueryPath = function(points) {
  this.init(points);
}

MediaQueryPath.prototype.init = function(points) {
  this.points = {}; 
  if (undefined !== points) {
    for (var width in points) if (points.hasOwnProperty(width)) {
      this.points[width] = points[width];
    }
  }
}

MediaQueryPath.prototype.addPoint = function(width, point) {
  this.points[width] = point;
}

MediaQueryPath.prototype.removePoint = function(width) {
  delete(this.points[width]);
}

MediaQueryPath.prototype.findAppropriateStyles = function(interpolate_width) {
  var min_width = null, max_width = null, result_style = null;
  if (undefined !== this.points[interpolate_width]) {
    result_style = this.points[interpolate_width];
  } else {
    for (var width in this.points) if (this.points.hasOwnProperty()) {
      if (min_width < width && interpolate_width > width) {
        min_width = width;
      }
      if (max_width > width && interpolate_width < width) {
        max_width = width;
      }
    }
    if (null === min_width && null !== max_width) {
      result_style = this.points[max_width];
    } else if (null !== min_width && null === max_width) {
      result_style = this.points[min_width];
    } else if (null !== min_width && null !== max_width) {
      var min_point = this.points[min_width];
      var max_point = this.points[max_width];
      result_style = {};
      for (var prop in min_point)
      if (min_point.hasOwnProperty(prop) && max_point.hasOwnProperty(prop)) {
        result_style = linear_map(
          min_width,
          max_width,
          min_point[prop],
          max_point[prop],
          interpolate_width
        );
      }
    } else {
      // @TODO: Exception: no points are given
      return null;
    }
  }
}

MediaQueryPath.prototype.applyStyles = function($object, interpolate_width) {
  var interpolated_style = this.findAppropriateStyles();
  if (null !== interpolated_style) $object.css(interpolated_style);
}