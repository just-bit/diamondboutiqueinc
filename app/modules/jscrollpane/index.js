require('./index.scss');

let $ = require('jquery');
require('../../../node_modules/jscrollpane/script/jquery.mousewheel');
require('../../../node_modules/jscrollpane/script/jquery.jscrollpane');

module.exports = function() {
  function initjScrollPane() {
    setTimeout(function() {
      $('.jScrollPane:not(.jspScrollable)').each(function() {
        var $this = $(this);

        if ($this.height() > 0) {
          $this.jScrollPane();
        }
      });
    }, 100);
  }

  $(document).click(initjScrollPane);
  initjScrollPane();
};
