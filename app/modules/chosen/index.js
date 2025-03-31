'use strict';

require('./index.scss');

var $ = require('jquery');

require('../../../node_modules/chosen-js/chosen.jquery.js');

module.exports = function() {
    $('.chosen-select').each(function() {
        var $this = $(this);
        var settings = {};
        if (typeof $this.data('chosen-settings') == 'object') {
            settings = $this.data('chosen-settings');
        }

        $(this).chosen(settings);
    });
};
