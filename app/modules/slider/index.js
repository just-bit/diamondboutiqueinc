'use strict';

require("./index.scss");

let $ = require('jquery');
require('slick-carousel');

module.exports = function() {
  $('.slick-slider').each(function() {
    var $this = $(this);
    if ($this.parents('.hidden').length == 0) {
      $this.slick();
    }
  });
};
