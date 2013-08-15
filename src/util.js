var linear_map = function(x1, x2, y1, y2, x) {
  k = (y1 - y2) / (x1 - x2);
  return k * x + y1 - x1 * k;
}

