'use strict';

require('./index.scss');

let $ = require('jquery');
require('magnific-popup');
require('slick-carousel');

module.exports = function() {
  $('.popup-btn').each(function(index, obj) {
    var $this = $(obj);

    var settings = {};

    settings.type = 'inline';
    if ($this.data('type') !== '') {
      settings.type = $this.data('type');
    }

    if (settings.type == 'inline') {
      var slider = $($this.data('mfp-src')).find('.slick-slider');

      if (slider.length) {
        settings.callbacks = {
          open: function() {
            slider.slick();
          }
        };
      }
    }

    $this.magnificPopup(settings);
  });
};
