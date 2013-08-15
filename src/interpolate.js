var parseMediaLabel: function(media_label) {
  // @TODO: more query types
  var queries = {
    /width:\s*(\d+)/: function(res) {
      return res[1];
    }
  }
  
  for (var r in queries) if (queries.hasOwnProperty(r)) {
    var res = r.exec(media_label);
    if (null === res) continue;
    return queries[r](res);
  }
  
  return null;
}

var elements = {};

var Interpolate = {
  media: function(media_label, media_props) {
    var media_param = parseMediaLabel(media_label);
    if (null !== media_param) {
      for (var selector in media_props) if (media_props.hasOwnProperty(selector)) {
        if (undefined === elements[selector]) {
          elements[selector] = {
            element: $(selector),
            media_query_path: new MediaQueryPath({
              media_param: media_props[selector];
            });
          }
        } else {
          elements[selector]['media_query_path'].addPoint(
            media_param,
            media_props[selector]
          );
        }
      }
    }
    
    return this;
  },
  
  bind: function() {
    $(window).on('resize', this.fireOnResize);
    
    return this;
  },
  
  unbind: function() {
    $(window).unbind('resize', this.fireOnResize);
    
    return this;
  },
  
  fire: function() {
    for (var selector in elements) if (elements.hasOwnProperty(selector)) {
      elements[selector]['media_query_path'].applyStyles(elements[selector]['element']);
    }
    
    return this;
  }
}