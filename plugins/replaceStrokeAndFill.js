'use strict';

exports.type = 'perItem';

exports.active = false;

exports.params = {
  stroke: true,
  fill: true,
  image: true
};

var regStrokeProps = /^stroke/,
regStrokeWidthProps = /^stroke\-width/,
regStrokeCapsProps = /^stroke\-linecap/,
regStrokeMiterProps = /^stroke\-miterlimit/,
regFillProps = /^fill/;

/**
* Replace stroke and fill attrs with classes "s" and "f".
*
* @param {Object} item current iteration item
* @param {Object} params plugin params
* @return {Boolean} if false, item will be filtered out
*
* @author dlz
*/
exports.fn = function(item, params) {
  if (item.isElem()) {

    // remove image elements
    if (params.image && item.isElem('image')) {
      return false;
    }

    // remove gradient elements
    if (params.fill && (item.isElem('linearGradient') || item.isElem('radialGradient'))) {
      return false;
    }

    // replace fill
    if (params.fill && !item.isElem('svg')) {
      if (item.hasAttr('fill', 'none')) {
        // no-op
      } else if (item.hasAttr('fill')) {
        item.addClass('f');
      }
      item.eachAttr(function(attr) {
        if (regFillProps.test(attr.name)) { item.removeAttr(attr.name); }
      });
    }

    // replace stroke
    if (params.stroke && item.hasAttr('stroke')) {
      item.eachAttr(function(attr) {
        if (regStrokeProps.test(attr.name)) { item.removeAttr(attr.name); }
      });
      item.addClass('s');
    }

    // remove stroke-width, stroke-linecap etc
    if (params.stroke && item.hasAttr('stroke-width')) {
      item.eachAttr(function(attr) {
        if (regStrokeWidthProps.test(attr.name)) { item.removeAttr(attr.name); }
      });
    }
    if (params.stroke && item.hasAttr('stroke-linecap')) {
      item.eachAttr(function(attr) {
        if (regStrokeCapsProps.test(attr.name)) { item.removeAttr(attr.name); }
      });
    }
    if (params.stroke && item.hasAttr('stroke-miterlimit')) {
      item.eachAttr(function(attr) {
        if (regStrokeMiterProps.test(attr.name)) { item.removeAttr(attr.name); }
      });
    }

  }
};
