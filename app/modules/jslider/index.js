'use strict';

require('./index.scss');

let $ = require('jquery');

module.exports = function() {
  /**
   * Copyright 2010 Tim Down.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * jshashtable
   *
   * jshashtable is a JavaScript implementation of a hash table. It creates a single constructor function called Hashtable
   * in the global scope.
   *
   * Author: Tim Down <tim@timdown.co.uk>
   * Version: 2.1
   * Build date: 21 March 2010
   * Website: http://www.timdown.co.uk/jshashtable
   */

  var Hashtable = (function() {
    var FUNCTION = 'function';

    var arrayRemoveAt = (typeof Array.prototype.splice == FUNCTION) ?
        function(arr, idx) {
          arr.splice(idx, 1);
        } :

        function(arr, idx) {
          var itemsAfterDeleted, i, len;
          if (idx === arr.length - 1) {
            arr.length = idx;
          } else {
            itemsAfterDeleted = arr.slice(idx + 1);
            arr.length = idx;
            for (i = 0, len = itemsAfterDeleted.length; i < len; ++i) {
              arr[idx + i] = itemsAfterDeleted[i];
            }
          }
        };

    function hashObject(obj) {
      var hashCode;
      if (typeof obj == 'string') {
        return obj;
      } else if (typeof obj.hashCode == FUNCTION) {
        // Check the hashCode method really has returned a string
        hashCode = obj.hashCode();
        return (typeof hashCode == 'string') ? hashCode : hashObject(hashCode);
      } else if (typeof obj.toString == FUNCTION) {
        return obj.toString();
      } else {
        try {
          return String(obj);
        } catch (ex) {
          // For host objects (such as ActiveObjects in IE) that have no toString() method and throw an error when
          // passed to String()
          return Object.prototype.toString.call(obj);
        }
      }
    }

    function equals_fixedValueHasEquals(fixedValue, variableValue) {
      return fixedValue.equals(variableValue);
    }

    function equals_fixedValueNoEquals(fixedValue, variableValue) {
      return (typeof variableValue.equals == FUNCTION) ?
          variableValue.equals(fixedValue) : (fixedValue === variableValue);
    }

    function createKeyValCheck(kvStr) {
      return function(kv) {
        if (kv === null) {
          throw new Error('null is not a valid ' + kvStr);
        } else if (typeof kv == 'undefined') {
          throw new Error(kvStr + ' must not be undefined');
        }
      };
    }

    var checkKey = createKeyValCheck('key'), checkValue = createKeyValCheck('value');

    /*----------------------------------------------------------------------------------------------------------------*/

    function Bucket(hash, firstKey, firstValue, equalityFunction) {
      this[0] = hash;
      this.entries = [];
      this.addEntry(firstKey, firstValue);

      if (equalityFunction !== null) {
        this.getEqualityFunction = function() {
          return equalityFunction;
        };
      }
    }

    var EXISTENCE = 0, ENTRY = 1, ENTRY_INDEX_AND_VALUE = 2;

    function createBucketSearcher(mode) {
      return function(key) {
        var i = this.entries.length, entry, equals = this.getEqualityFunction(key);
        while (i--) {
          entry = this.entries[i];
          if ( equals(key, entry[0]) ) {
            switch (mode) {
              case EXISTENCE:
                return true;
              case ENTRY:
                return entry;
              case ENTRY_INDEX_AND_VALUE:
                return [ i, entry[1] ];
            }
          }
        }
        return false;
      };
    }

    function createBucketLister(entryProperty) {
      return function(aggregatedArr) {
        var startIndex = aggregatedArr.length;
        for (var i = 0, len = this.entries.length; i < len; ++i) {
          aggregatedArr[startIndex + i] = this.entries[i][entryProperty];
        }
      };
    }

    Bucket.prototype = {
      getEqualityFunction: function(searchValue) {
        return (typeof searchValue.equals == FUNCTION) ? equals_fixedValueHasEquals : equals_fixedValueNoEquals;
      },

      getEntryForKey: createBucketSearcher(ENTRY),

      getEntryAndIndexForKey: createBucketSearcher(ENTRY_INDEX_AND_VALUE),

      removeEntryForKey: function(key) {
        var result = this.getEntryAndIndexForKey(key);
        if (result) {
          arrayRemoveAt(this.entries, result[0]);
          return result[1];
        }
        return null;
      },

      addEntry: function(key, value) {
        this.entries[this.entries.length] = [key, value];
      },

      keys: createBucketLister(0),

      values: createBucketLister(1),

      getEntries: function(entries) {
        var startIndex = entries.length;
        for (var i = 0, len = this.entries.length; i < len; ++i) {
          // Clone the entry stored in the bucket before adding to array
          entries[startIndex + i] = this.entries[i].slice(0);
        }
      },

      containsKey: createBucketSearcher(EXISTENCE),

      containsValue: function(value) {
        var i = this.entries.length;
        while (i--) {
          if ( value === this.entries[i][1] ) {
            return true;
          }
        }
        return false;
      }
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    // Supporting functions for searching hashtable buckets

    function searchBuckets(buckets, hash) {
      var i = buckets.length, bucket;
      while (i--) {
        bucket = buckets[i];
        if (hash === bucket[0]) {
          return i;
        }
      }
      return null;
    }

    function getBucketForHash(bucketsByHash, hash) {
      var bucket = bucketsByHash[hash];

      // Check that this is a genuine bucket and not something inherited from the bucketsByHash's prototype
      return ( bucket && (bucket instanceof Bucket) ) ? bucket : null;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    function Hashtable(hashingFunctionParam, equalityFunctionParam) {
      var that = this;
      var buckets = [];
      var bucketsByHash = {};

      var hashingFunction = (typeof hashingFunctionParam == FUNCTION) ? hashingFunctionParam : hashObject;
      var equalityFunction = (typeof equalityFunctionParam == FUNCTION) ? equalityFunctionParam : null;

      this.put = function(key, value) {
        checkKey(key);
        checkValue(value);
        var hash = hashingFunction(key), bucket, bucketEntry, oldValue = null;

        // Check if a bucket exists for the bucket key
        bucket = getBucketForHash(bucketsByHash, hash);
        if (bucket) {
          // Check this bucket to see if it already contains this key
          bucketEntry = bucket.getEntryForKey(key);
          if (bucketEntry) {
            // This bucket entry is the current mapping of key to value, so replace old value and we're done.
            oldValue = bucketEntry[1];
            bucketEntry[1] = value;
          } else {
            // The bucket does not contain an entry for this key, so add one
            bucket.addEntry(key, value);
          }
        } else {
          // No bucket exists for the key, so create one and put our key/value mapping in
          bucket = new Bucket(hash, key, value, equalityFunction);
          buckets[buckets.length] = bucket;
          bucketsByHash[hash] = bucket;
        }
        return oldValue;
      };

      this.get = function(key) {
        checkKey(key);

        var hash = hashingFunction(key);

        // Check if a bucket exists for the bucket key
        var bucket = getBucketForHash(bucketsByHash, hash);
        if (bucket) {
          // Check this bucket to see if it contains this key
          var bucketEntry = bucket.getEntryForKey(key);
          if (bucketEntry) {
            // This bucket entry is the current mapping of key to value, so return the value.
            return bucketEntry[1];
          }
        }
        return null;
      };

      this.containsKey = function(key) {
        checkKey(key);
        var bucketKey = hashingFunction(key);

        // Check if a bucket exists for the bucket key
        var bucket = getBucketForHash(bucketsByHash, bucketKey);

        return bucket ? bucket.containsKey(key) : false;
      };

      this.containsValue = function(value) {
        checkValue(value);
        var i = buckets.length;
        while (i--) {
          if (buckets[i].containsValue(value)) {
            return true;
          }
        }
        return false;
      };

      this.clear = function() {
        buckets.length = 0;
        bucketsByHash = {};
      };

      this.isEmpty = function() {
        return !buckets.length;
      };

      var createBucketAggregator = function(bucketFuncName) {
        return function() {
          var aggregated = [], i = buckets.length;
          while (i--) {
            buckets[i][bucketFuncName](aggregated);
          }
          return aggregated;
        };
      };

      this.keys = createBucketAggregator('keys');
      this.values = createBucketAggregator('values');
      this.entries = createBucketAggregator('getEntries');

      this.remove = function(key) {
        checkKey(key);

        var hash = hashingFunction(key), bucketIndex, oldValue = null;

        // Check if a bucket exists for the bucket key
        var bucket = getBucketForHash(bucketsByHash, hash);

        if (bucket) {
          // Remove entry from this bucket for this key
          oldValue = bucket.removeEntryForKey(key);
          if (oldValue !== null) {
            // Entry was removed, so check if bucket is empty
            if (!bucket.entries.length) {
              // Bucket is empty, so remove it from the bucket collections
              bucketIndex = searchBuckets(buckets, hash);
              arrayRemoveAt(buckets, bucketIndex);
              delete bucketsByHash[hash];
            }
          }
        }
        return oldValue;
      };

      this.size = function() {
        var total = 0, i = buckets.length;
        while (i--) {
          total += buckets[i].entries.length;
        }
        return total;
      };

      this.each = function(callback) {
        var entries = that.entries(), i = entries.length, entry;
        while (i--) {
          entry = entries[i];
          callback(entry[0], entry[1]);
        }
      };

      this.putAll = function(hashtable, conflictCallback) {
        var entries = hashtable.entries();
        var entry, key, value, thisValue, i = entries.length;
        var hasConflictCallback = (typeof conflictCallback == FUNCTION);
        while (i--) {
          entry = entries[i];
          key = entry[0];
          value = entry[1];

          // Check for a conflict. The default behaviour is to overwrite the value for an existing key
          if ( hasConflictCallback && (thisValue = that.get(key)) ) {
            value = conflictCallback(key, thisValue, value);
          }
          that.put(key, value);
        }
      };

      this.clone = function() {
        var clone = new Hashtable(hashingFunctionParam, equalityFunctionParam);
        clone.putAll(that);
        return clone;
      };
    }

    return Hashtable;
  })();

  $.baseClass = function(obj) {
    obj = $(obj);
    return obj.get(0).className.match(/([^ ]+)/)[1];
  };

  $.fn.addDependClass = function(className, delimiter) {
    var options = {
      delimiter: delimiter ? delimiter : '-'
    };
    return this.each(function() {
      var baseClass = $.baseClass(this);
      if (baseClass)
        $(this).addClass(baseClass + options.delimiter + className);
    });
  };

  $.fn.removeDependClass = function(className, delimiter) {
    var options = {
      delimiter: delimiter ? delimiter : '-'
    };
    return this.each(function() {
      var baseClass = $.baseClass(this);
      if (baseClass)
        $(this).removeClass(baseClass + options.delimiter + className);
    });
  };

  $.fn.toggleDependClass = function(className, delimiter) {
    var options = {
      delimiter: delimiter ? delimiter : '-'
    };
    return this.each(function() {
      var baseClass = $.baseClass(this);
      if (baseClass)
        if ($(this).is('.' + baseClass + options.delimiter + className))
          $(this).removeClass(baseClass + options.delimiter + className);
        else
                    $(this).addClass(baseClass + options.delimiter + className);
    });
  };


  function Draggable() {
    this._init.apply( this, arguments );
  }

  Draggable.prototype.oninit = function() {

  };

  Draggable.prototype.events = function() {

  };

  Draggable.prototype.onmousedown = function() {
    this.ptr.css({ position: 'absolute' });
  };

  Draggable.prototype.onmousemove = function( evt, x, y ) {
    this.ptr.css({ left: x, top: y });
  };

  Draggable.prototype.onmouseup = function() {

  };

  Draggable.prototype.isDefault = {
    drag: false,
    clicked: false,
    toclick: true,
    mouseup: false
  };

  Draggable.prototype._init = function() {
    if ( arguments.length > 0 ) {
      this.ptr = $(arguments[0]);
      this.outer = $('.draggable-outer');

      this.is = {};
      $.extend( this.is, this.isDefault );

      var _offset = this.ptr.offset();
      this.d = {
        left: _offset.left,
        top: _offset.top,
        width: this.ptr.width(),
        height: this.ptr.height()
      };

      this.oninit.apply( this, arguments );

      this._events();
    }
  };

  Draggable.prototype._getPageCoords = function( event ) {
    if ( event.targetTouches && event.targetTouches[0] ) {
      return { x: event.targetTouches[0].pageX, y: event.targetTouches[0].pageY };
    } else
            return { x: event.pageX, y: event.pageY };
  };

  Draggable.prototype._bindEvent = function( ptr, eventType, handler ) {
    var self = this;

    if ( this.supportTouches_ )
      ptr.get(0).addEventListener( this.events_[ eventType ], handler, false );

    else
            ptr.bind( this.events_[ eventType ], handler );
  };

  Draggable.prototype._events = function() {
    var self = this;

    this.supportTouches_ = 'ontouchend' in document;
    this.events_ = {
      'click': this.supportTouches_ ? 'touchstart' : 'click',
      'down': this.supportTouches_ ? 'touchstart' : 'mousedown',
      'move': this.supportTouches_ ? 'touchmove' : 'mousemove',
      'up': this.supportTouches_ ? 'touchend' : 'mouseup'
    };

    this._bindEvent( $( document ), 'move', function( event ) {
      if ( self.is.drag ) {
        event.stopPropagation();
        event.preventDefault();
        self._mousemove( event );
      }
    });
    this._bindEvent( $( document ), 'down', function( event ) {
      if ( self.is.drag ) {
        event.stopPropagation();
        event.preventDefault();
      }
    });
    this._bindEvent( $( document ), 'up', function( event ) {
      self._mouseup( event );
    });

    this._bindEvent( this.ptr, 'down', function( event ) {
      self._mousedown( event );
      return false;
    });
    this._bindEvent( this.ptr, 'up', function( event ) {
      self._mouseup( event );
    });

    this.ptr.find('a')
            .click(function() {
              self.is.clicked = true;

              if ( !self.is.toclick ) {
                self.is.toclick = true;
                return false;
              }
            })
            .mousedown(function( event ) {
              self._mousedown( event );
              return false;
            });

    this.events();
  };

  Draggable.prototype._mousedown = function( evt ) {
    this.is.drag = true;
    this.is.clicked = false;
    this.is.mouseup = false;

    var _offset = this.ptr.offset();
    var coords = this._getPageCoords( evt );
    this.cx = coords.x - _offset.left;
    this.cy = coords.y - _offset.top;

    $.extend(this.d, {
      left: _offset.left,
      top: _offset.top,
      width: this.ptr.width(),
      height: this.ptr.height()
    });

    if ( this.outer && this.outer.get(0) ) {
      this.outer.css({ height: Math.max(this.outer.height(), $(document.body).height()), overflow: 'hidden' });
    }

    this.onmousedown( evt );
  };

  Draggable.prototype._mousemove = function( evt ) {
    this.is.toclick = false;
    var coords = this._getPageCoords( evt );
    this.onmousemove( evt, coords.x - this.cx, coords.y - this.cy );
  };

  Draggable.prototype._mouseup = function( evt ) {
    var oThis = this;

    if ( this.is.drag ) {
      this.is.drag = false;

      if ( this.outer && this.outer.get(0) ) {
        if ( $.browser.mozilla ) {
          this.outer.css({ overflow: 'hidden' });
        } else {
          this.outer.css({ overflow: 'visible' });
        }

        if ( $.browser.msie && $.browser.version == '6.0' ) {
          this.outer.css({ height: '100%' });
        } else {
          this.outer.css({ height: 'auto' });
        }
      }

      this.onmouseup( evt );
    }
  };

  window.Draggable = Draggable;

  var cache = {};

  var tmpl = function tmpl(str, data) {
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function('obj',
                'var p=[],print=function(){p.push.apply(p,arguments);};' +

                // Introduce the data as local variables using with(){}
                "with(obj){p.push('" +

                // Convert the template into pure JavaScript
                str
                    .replace(/[\r\t\n]/g, ' ')
                    .split('<%').join('\t')
                    .replace(/((^|%>)[^\t]*)'/g, '$1\r')
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split('\t').join("');")
                    .split('%>').join("p.push('")
                    .split('\r').join("\\'")
                + "');}return p.join('');");

        // Provide some basic currying to the user
    return data ? fn(data) : fn;
  };


    /**
     * jquery.slider - Slider ui control in jQuery
     *
     * Written by
     * Egor Khmelev (hmelyoff@gmail.com)
     *
     * Licensed under the MIT (MIT-LICENSE.txt).
     *
     * @author Egor Khmelev
     * @version 1.1.0-RELEASE ($Id$)
     *
     * Dependencies
     *
     * jQuery (http://jquery.com)
     * jquery.numberformatter (http://code.google.com/p/jquery-numberformatter/)
     * tmpl (http://ejohn.org/blog/javascript-micro-templating/)
     * jquery.dependClass
     * draggable
     *
     **/

  function isArray(value) {
    if (typeof value == 'undefined') return false;

    if (value instanceof Array || (!(value instanceof Object) &&
                (Object.prototype.toString.call((value)) == '[object Array]') ||
                typeof value.length == 'number' &&
                typeof value.splice != 'undefined' &&
                typeof value.propertyIsEnumerable != 'undefined' && !value.propertyIsEnumerable('splice')
            )) {
      return true;
    }

    return false;
  }

  $.slider = function(node, settings) {
    var jNode = $(node);
    if (!jNode.data('jslider'))
      jNode.data('jslider', new jSlider(node, settings));

    return jNode.data('jslider');
  };

  $.fn.slider = function(action, opt_value) {
    var returnValue, args = arguments;

    function isDef(val) {
      return val !== undefined;
    }

    function isDefAndNotNull(val) {
      return val != null;
    }

    this.each(function() {
      var self = $.slider(this, action);

            // do actions
      if (typeof action == 'string') {
        switch (action) {
          case 'value':
            if (isDef(args[1]) && isDef(args[2])) {
              var pointers = self.getPointers();
              if (isDefAndNotNull(pointers[0]) && isDefAndNotNull(args[1])) {
                pointers[0].set(args[1]);
                pointers[0].setIndexOver();
              }

              if (isDefAndNotNull(pointers[1]) && isDefAndNotNull(args[2])) {
                pointers[1].set(args[2]);
                pointers[1].setIndexOver();
              }
            }

            else if (isDef(args[1])) {
              var pointers = self.getPointers();
              if (isDefAndNotNull(pointers[0]) && isDefAndNotNull(args[1])) {
                pointers[0].set(args[1]);
                pointers[0].setIndexOver();
              }
            }

                        else
                            returnValue = self.getValue();

            break;

          case 'prc':
            if (isDef(args[1]) && isDef(args[2])) {
              var pointers = self.getPointers();
              if (isDefAndNotNull(pointers[0]) && isDefAndNotNull(args[1])) {
                pointers[0]._set(args[1]);
                pointers[0].setIndexOver();
              }

              if (isDefAndNotNull(pointers[1]) && isDefAndNotNull(args[2])) {
                pointers[1]._set(args[2]);
                pointers[1].setIndexOver();
              }
            }

            else if (isDef(args[1])) {
              var pointers = self.getPointers();
              if (isDefAndNotNull(pointers[0]) && isDefAndNotNull(args[1])) {
                pointers[0]._set(args[1]);
                pointers[0].setIndexOver();
              }
            }

                        else
                            returnValue = self.getPrcValue();

            break;

          case 'calculatedValue':
            var value = self.getValue().split(';');
            returnValue = '';
            for (var i = 0; i < value.length; i++) {
              returnValue += (i > 0 ? ';' : '') + self.nice(value[i]);
            }

            break;

          case 'skin':
            self.setSkin(args[1]);

            break;
        }
      }

            // return actual object
      else if (!action && !opt_value) {
        if (!isArray(returnValue))
          returnValue = [];

        returnValue.push(self);
      }
    });

        // flatten array just with one slider
    if (isArray(returnValue) && returnValue.length == 1)
      returnValue = returnValue[0];

    return returnValue || this;
  };

  var OPTIONS = {

    settings: {
      from: 1,
      to: 10,
      step: 1,
      smooth: true,
      limits: true,
      round: 0,
      format: {format: '#,##0.##'},
      value: '5;7',
      dimension: ''
    },

    className: 'jslider',
    selector: '.jslider-',

    template: tmpl(
            '<span class="<%=className%>">' +
            '<table><tr><td>' +
            '<div class="<%=className%>-bg">' +
            '<i class="l"></i><i class="f"></i><i class="r"></i>' +
            '<i class="v"></i>' +
            '</div>' +

            '<div class="<%=className%>-pointer"></div>' +
            '<div class="<%=className%>-pointer <%=className%>-pointer-to"></div>' +

            '<div class="<%=className%>-label"><span><%=settings.from%></span></div>' +
            '<div class="<%=className%>-label <%=className%>-label-to"><span><%=settings.to%></span><%=settings.dimension%></div>' +

            '<div class="<%=className%>-value"><span></span><%=settings.dimension%></div>' +
            '<div class="<%=className%>-value <%=className%>-value-to"><span></span><%=settings.dimension%></div>' +

            '<div class="<%=className%>-scale"><%=scale%></div>' +

            '</td></tr></table>' +
            '</span>'
        )

  };

  function jSlider() {
    return this.init.apply(this, arguments);
  }

  jSlider.prototype.init = function(node, settings) {
    this.settings = $.extend(true, {}, OPTIONS.settings, settings ? settings : {});

        // obj.sliderHandler = this;
    this.inputNode = $(node).hide();

    this.settings.interval = this.settings.to - this.settings.from;
    this.settings.value = this.inputNode.attr('value');

    if (this.settings.calculate && $.isFunction(this.settings.calculate))
      this.nice = this.settings.calculate;

    if (this.settings.onstatechange && $.isFunction(this.settings.onstatechange))
      this.onstatechange = this.settings.onstatechange;

    this.is = {
      init: false
    };
    this.o = {};

    this.create();
  };

  jSlider.prototype.onstatechange = function() {

  };

  jSlider.prototype.create = function() {
    var $this = this;

    this.domNode = $(OPTIONS.template({
      className: OPTIONS.className,
      settings: {
        from: this.nice(this.settings.from),
        to: this.nice(this.settings.to),
        dimension: this.settings.dimension
      },
      scale: this.generateScale()
    }));

    this.inputNode.after(this.domNode);
    this.drawScale();

        // set skin class
    if (this.settings.skin && this.settings.skin.length > 0)
      this.setSkin(this.settings.skin);

    this.sizes = {
      domWidth: this.domNode.width(),
      domOffset: this.domNode.offset()
    };

        // find some objects
    $.extend(this.o, {
      pointers: {},
      labels: {
        0: {
          o: this.domNode.find(OPTIONS.selector + 'value').not(OPTIONS.selector + 'value-to')
        },
        1: {
          o: this.domNode.find(OPTIONS.selector + 'value').filter(OPTIONS.selector + 'value-to')
        }
      },
      limits: {
        0: this.domNode.find(OPTIONS.selector + 'label').not(OPTIONS.selector + 'label-to'),
        1: this.domNode.find(OPTIONS.selector + 'label').filter(OPTIONS.selector + 'label-to')
      }
    });

    $.extend(this.o.labels[0], {
      value: this.o.labels[0].o.find('span')
    });

    $.extend(this.o.labels[1], {
      value: this.o.labels[1].o.find('span')
    });


    if (!$this.settings.value.split(';')[1]) {
      this.settings.single = true;
      this.domNode.addDependClass('single');
    }

    if (!$this.settings.limits)
      this.domNode.addDependClass('limitless');

    this.domNode.find(OPTIONS.selector + 'pointer').each(function(i) {
      var value = $this.settings.value.split(';')[i];
      if (value) {
        $this.o.pointers[i] = new jSliderPointer(this, i, $this);

        var prev = $this.settings.value.split(';')[i - 1];
        if (prev && new Number(value) < new Number(prev)) value = prev;

        value = value < $this.settings.from ? $this.settings.from : value;
        value = value > $this.settings.to ? $this.settings.to : value;

        $this.o.pointers[i].set(value, true);
      }
    });

    this.o.value = this.domNode.find('.v');
    this.is.init = true;

    $.each(this.o.pointers, function(i) {
      $this.redraw(this);
    });

    (function(self) {
      $(window).resize(function() {
        self.onresize();
      });
    })(this);
  };

  jSlider.prototype.setSkin = function(skin) {
    if (this.skin_)
      this.domNode.removeDependClass(this.skin_, '_');

    this.domNode.addDependClass(this.skin_ = skin, '_');
  };

  jSlider.prototype.setPointersIndex = function(i) {
    $.each(this.getPointers(), function(i) {
      this.index(i);
    });
  };

  jSlider.prototype.getPointers = function() {
    return this.o.pointers;
  };

  jSlider.prototype.generateScale = function() {
    if (this.settings.scale && this.settings.scale.length > 0) {
      var str = '';
      var s = this.settings.scale;
      var prc = Math.round((100 / (s.length - 1)) * 10) / 10;
      for (var i = 0; i < s.length; i++) {
        str += '<span style="left: ' + i * prc + '%">' + ( s[i] != '|' ? '<ins>' + s[i] + '</ins>' : '' ) + '</span>';
      }
      return str;
    } else return '';

    return '';
  };

  jSlider.prototype.drawScale = function() {
    this.domNode.find(OPTIONS.selector + 'scale span ins').each(function() {
      $(this).css({marginLeft: -$(this).outerWidth() / 2});
    });
  };

  jSlider.prototype.onresize = function() {
    var self = this;
    this.sizes = {
      domWidth: this.domNode.width(),
      domOffset: this.domNode.offset()
    };

    $.each(this.o.pointers, function(i) {
      self.redraw(this);
    });
  };

  jSlider.prototype.update = function() {
    this.onresize();
    this.drawScale();
  };

  jSlider.prototype.limits = function(x, pointer) {
        // smooth
    if (!this.settings.smooth) {
      var step = this.settings.step * 100 / ( this.settings.interval );
      x = Math.round(x / step) * step;
    }

    var another = this.o.pointers[1 - pointer.uid];
    if (another && pointer.uid && x < another.value.prc) x = another.value.prc;
    if (another && !pointer.uid && x > another.value.prc) x = another.value.prc;

        // base limit
    if (x < 0) x = 0;
    if (x > 100) x = 100;

    return Math.round(x * 10) / 10;
  };

  jSlider.prototype.redraw = function(pointer) {
    if (!this.is.init) return false;

    this.setValue();

        // redraw range line
    if (this.o.pointers[0] && this.o.pointers[1])
      this.o.value.css({
        left: this.o.pointers[0].value.prc + '%',
        width: ( this.o.pointers[1].value.prc - this.o.pointers[0].value.prc ) + '%'
      });

    this.o.labels[pointer.uid].value.html(
            this.nice(
                pointer.value.origin
            )
        );

        // redraw position of labels
    this.redrawLabels(pointer);
  };

  jSlider.prototype.redrawLabels = function(pointer) {
    function setPosition(label, sizes, prc) {
      sizes.margin = -sizes.label / 2;

            // left limit
      var label_left = sizes.border + sizes.margin;
      if (label_left < 0)
        sizes.margin -= label_left;

            // right limit
      if (sizes.border + sizes.label / 2 > self.sizes.domWidth) {
        sizes.margin = 0;
        sizes.right = true;
      } else
                sizes.right = false;

      label.o.css({left: prc + '%', marginLeft: sizes.margin, right: 'auto'});
      if (sizes.right) label.o.css({left: 'auto', right: 0});
      return sizes;
    }

    var self = this;
    var label = this.o.labels[pointer.uid];
    var prc = pointer.value.prc;

    var sizes = {
      label: label.o.outerWidth(),
      right: false,
      border: ( prc * this.sizes.domWidth ) / 100
    };

    if (!this.settings.single) {
            // glue if near;
      var another = this.o.pointers[1 - pointer.uid];
      var another_label = this.o.labels[another.uid];

      switch (pointer.uid) {
        case 0:
          if (sizes.border + sizes.label / 2 > another_label.o.offset().left - this.sizes.domOffset.left) {
            another_label.o.css({visibility: 'hidden'});
            another_label.value.html(this.nice(another.value.origin));

            label.o.css({visibility: 'visible'});

            prc = ( another.value.prc - prc ) / 2 + prc;
            if (another.value.prc != pointer.value.prc) {
              label.value.html(this.nice(pointer.value.origin) + '&nbsp;&ndash;&nbsp;' + this.nice(another.value.origin));
              sizes.label = label.o.outerWidth();
              sizes.border = ( prc * this.sizes.domWidth ) / 100;
            }
          } else {
            another_label.o.css({visibility: 'visible'});
          }
          break;

        case 1:
          if (sizes.border - sizes.label / 2 < another_label.o.offset().left - this.sizes.domOffset.left + another_label.o.outerWidth()) {
            another_label.o.css({visibility: 'hidden'});
            another_label.value.html(this.nice(another.value.origin));

            label.o.css({visibility: 'visible'});

            prc = ( prc - another.value.prc ) / 2 + another.value.prc;
            if (another.value.prc != pointer.value.prc) {
              label.value.html(this.nice(another.value.origin) + '&nbsp;&ndash;&nbsp;' + this.nice(pointer.value.origin));
              sizes.label = label.o.outerWidth();
              sizes.border = ( prc * this.sizes.domWidth ) / 100;
            }
          } else {
            another_label.o.css({visibility: 'visible'});
          }
          break;
      }
    }

    sizes = setPosition(label, sizes, prc);

        /* draw second label */
    if (another_label) {
      var sizes = {
        label: another_label.o.outerWidth(),
        right: false,
        border: ( another.value.prc * this.sizes.domWidth ) / 100
      };
      sizes = setPosition(another_label, sizes, another.value.prc);
    }

    this.redrawLimits();
  };

  jSlider.prototype.redrawLimits = function() {
    if (this.settings.limits) {
      var limits = [true, true];

      for (key in this.o.pointers) {
        if (!this.settings.single || key == 0) {
          var pointer = this.o.pointers[key];
          var label = this.o.labels[pointer.uid];
          var label_left = label.o.offset().left - this.sizes.domOffset.left;

          var limit = this.o.limits[0];
          if (label_left < limit.outerWidth())
            limits[0] = false;

          var limit = this.o.limits[1];
          if (label_left + label.o.outerWidth() > this.sizes.domWidth - limit.outerWidth())
            limits[1] = false;
        }
      }

      for (var i = 0; i < limits.length; i++) {
        if (limits[i])
          this.o.limits[i].fadeIn('fast');
        else
                    this.o.limits[i].fadeOut('fast');
      }
    }
  };

  jSlider.prototype.setValue = function() {
    var value = this.getValue();
    this.inputNode.attr('value', value);
    this.onstatechange.call(this, value);
  };

  jSlider.prototype.getValue = function() {
    if (!this.is.init) return false;
    var $this = this;

    var value = '';
    $.each(this.o.pointers, function(i) {
      if (this.value.prc != undefined && !isNaN(this.value.prc)) value += (i > 0 ? ';' : '') + $this.prcToValue(this.value.prc);
    });
    return value;
  };

  jSlider.prototype.getPrcValue = function() {
    if (!this.is.init) return false;
    var $this = this;

    var value = '';
    $.each(this.o.pointers, function(i) {
      if (this.value.prc != undefined && !isNaN(this.value.prc)) value += (i > 0 ? ';' : '') + this.value.prc;
    });
    return value;
  };

  jSlider.prototype.prcToValue = function(prc) {
    if (this.settings.heterogeneity && this.settings.heterogeneity.length > 0) {
      var h = this.settings.heterogeneity;

      var _start = 0;
      var _from = this.settings.from;

      for (var i = 0; i <= h.length; i++) {
        if (h[i]) var v = h[i].split('/');
        else       var v = [100, this.settings.to];

        v[0] = new Number(v[0]);
        v[1] = new Number(v[1]);

        if (prc >= _start && prc <= v[0]) {
          var value = _from + ( (prc - _start) * (v[1] - _from) ) / (v[0] - _start);
        }

        _start = v[0];
        _from = v[1];
      }
    } else {
      var value = this.settings.from + ( prc * this.settings.interval ) / 100;
    }

    return this.round(value);
  };

  jSlider.prototype.valueToPrc = function(value, pointer) {
    if (this.settings.heterogeneity && this.settings.heterogeneity.length > 0) {
      var h = this.settings.heterogeneity;

      var _start = 0;
      var _from = this.settings.from;

      for (var i = 0; i <= h.length; i++) {
        if (h[i]) var v = h[i].split('/');
        else     var v = [100, this.settings.to];
        v[0] = new Number(v[0]);
        v[1] = new Number(v[1]);

        if (value >= _from && value <= v[1]) {
          var prc = pointer.limits(_start + (value - _from) * (v[0] - _start) / (v[1] - _from));
        }

        _start = v[0];
        _from = v[1];
      }
    } else {
      var prc = pointer.limits((value - this.settings.from) * 100 / this.settings.interval);
    }

    return prc;
  };

  jSlider.prototype.round = function(value) {
    value = Math.round(value / this.settings.step) * this.settings.step;
    if (this.settings.round) value = Math.round(value * Math.pow(10, this.settings.round)) / Math.pow(10, this.settings.round);
    else value = Math.round(value);
    return value;
  };

  jSlider.prototype.nice = function(value) {
    value = value.toString().replace(/,/gi, '.').replace(/ /gi, '');

    if ($.formatNumber) {
      return $.formatNumber(new Number(value), this.settings.format || {}).replace(/-/gi, '&minus;');
    }

    else {
      return new Number(value);
    }
  };


  function jSliderPointer() {
    Draggable.apply(this, arguments);
  }

  jSliderPointer.prototype = new Draggable();

  jSliderPointer.prototype.oninit = function(ptr, id, _constructor) {
    this.uid = id;
    this.parent = _constructor;
    this.value = {};
    this.settings = this.parent.settings;
  };

  jSliderPointer.prototype.onmousedown = function(evt) {
    this._parent = {
      offset: this.parent.domNode.offset(),
      width: this.parent.domNode.width()
    };
    this.ptr.addDependClass('hover');
    this.setIndexOver();
  };

  jSliderPointer.prototype.onmousemove = function(evt, x) {
    var coords = this._getPageCoords(evt);
    this._set(this.calc(coords.x));
  };

  jSliderPointer.prototype.onmouseup = function(evt) {
    if (this.parent.settings.callback && $.isFunction(this.parent.settings.callback))
      this.parent.settings.callback.call(this.parent, this.parent.getValue());

    this.ptr.removeDependClass('hover');
  };

  jSliderPointer.prototype.setIndexOver = function() {
    this.parent.setPointersIndex(1);
    this.index(2);
  };

  jSliderPointer.prototype.index = function(i) {
    this.ptr.css({zIndex: i});
  };

  jSliderPointer.prototype.limits = function(x) {
    return this.parent.limits(x, this);
  };

  jSliderPointer.prototype.calc = function(coords) {
    var x = this.limits(((coords - this._parent.offset.left) * 100) / this._parent.width);
    return x;
  };

  jSliderPointer.prototype.set = function(value, opt_origin) {
    this.value.origin = this.parent.round(value);
    this._set(this.parent.valueToPrc(value, this), opt_origin);
  };

  jSliderPointer.prototype._set = function(prc, opt_origin) {
    if (!opt_origin)
      this.value.origin = this.parent.prcToValue(prc);

    this.value.prc = prc;
    this.ptr.css({left: prc + '%'});
    this.parent.redraw(this);
  };

  var nfLocales = new Hashtable();

  var nfLocalesLikeUS = [ 'ae', 'au', 'ca', 'cn', 'eg', 'gb', 'hk', 'il', 'in', 'jp', 'sk', 'th', 'tw', 'us' ];
  var nfLocalesLikeDE = [ 'at', 'br', 'de', 'dk', 'es', 'gr', 'it', 'nl', 'pt', 'tr', 'vn' ];
  var nfLocalesLikeFR = [ 'cz', 'fi', 'fr', 'ru', 'se', 'pl' ];
  var nfLocalesLikeCH = [ 'ch' ];

  var nfLocaleFormatting = [ ['.', ','], [',', '.'], [',', ' '], ['.', "'"] ];
  var nfAllLocales = [ nfLocalesLikeUS, nfLocalesLikeDE, nfLocalesLikeFR, nfLocalesLikeCH ];

  function FormatData(dec, group, neg) {
    this.dec = dec;
    this.group = group;
    this.neg = neg;
  }

  function init() {
    // write the arrays into the hashtable
    for (var localeGroupIdx = 0; localeGroupIdx < nfAllLocales.length; localeGroupIdx++) {
      var localeGroup = nfAllLocales[localeGroupIdx];
      for (var i = 0; i < localeGroup.length; i++) {
        nfLocales.put(localeGroup[i], localeGroupIdx);
      }
    }
  }

  function formatCodes(locale, isFullLocale) {
    if (nfLocales.size() == 0)
      init();

    // default values
    var dec = '.';
    var group = ',';
    var neg = '-';

    if (isFullLocale == false) {
      // Extract and convert to lower-case any language code from a real 'locale' formatted string, if not use as-is
      // (To prevent locale format like : "fr_FR", "en_US", "de_DE", "fr_FR", "en-US", "de-DE")
      if (locale.indexOf('_') != -1)
        locale = locale.split('_')[1].toLowerCase();
      else if (locale.indexOf('-') != -1)
        locale = locale.split('-')[1].toLowerCase();
    }

    // hashtable lookup to match locale with codes
    var codesIndex = nfLocales.get(locale);
    if (codesIndex) {
      var codes = nfLocaleFormatting[codesIndex];
      if (codes) {
        dec = codes[0];
        group = codes[1];
      }
    }
    return new FormatData(dec, group, neg);
  }


  /*	Formatting Methods	*/


  /**
   * Formats anything containing a number in standard js number notation.
   *
   * @param {Object}	options			The formatting options to use
   * @param {Boolean}	writeBack		(true) If the output value should be written back to the subject
   * @param {Boolean} giveReturnValue	(true) If the function should return the output string
   */
  jQuery.fn.formatNumber = function(options, writeBack, giveReturnValue) {
    return this.each(function() {
      // enforce defaults
      if (writeBack == null)
        writeBack = true;
      if (giveReturnValue == null)
        giveReturnValue = true;

      // get text
      var text;
      if (jQuery(this).is(':input'))
        text = new String(jQuery(this).val());
      else
        text = new String(jQuery(this).text());

      // format
      var returnString = jQuery.formatNumber(text, options);

      // set formatted string back, only if a success
//			if (returnString) {
      if (writeBack) {
        if (jQuery(this).is(':input'))
          jQuery(this).val(returnString);
        else
          jQuery(this).text(returnString);
      }
      if (giveReturnValue)
        return returnString;
//			}
//			return '';
    });
  };

  /**
   * First parses a string and reformats it with the given options.
   *
   * @param {Object} numberString
   * @param {Object} options
   */
  jQuery.formatNumber = function(numberString, options) {
    var options = jQuery.extend({}, jQuery.fn.formatNumber.defaults, options);
    var formatData = formatCodes(options.locale.toLowerCase(), options.isFullLocale);

    var dec = formatData.dec;
    var group = formatData.group;
    var neg = formatData.neg;

    var validFormat = '0#-,.';

    // strip all the invalid characters at the beginning and the end
    // of the format, and we'll stick them back on at the end
    // make a special case for the negative sign "-" though, so
    // we can have formats like -$23.32
    var prefix = '';
    var negativeInFront = false;
    for (var i = 0; i < options.format.length; i++) {
      if (validFormat.indexOf(options.format.charAt(i)) == -1)
        prefix = prefix + options.format.charAt(i);
      else
      if (i == 0 && options.format.charAt(i) == '-') {
        negativeInFront = true;
        continue;
      }
      else
        break;
    }
    var suffix = '';
    for (var i = options.format.length - 1; i >= 0; i--) {
      if (validFormat.indexOf(options.format.charAt(i)) == -1)
        suffix = options.format.charAt(i) + suffix;
      else
        break;
    }

    options.format = options.format.substring(prefix.length);
    options.format = options.format.substring(0, options.format.length - suffix.length);

    // now we need to convert it into a number
    // while (numberString.indexOf(group) > -1)
    //	numberString = numberString.replace(group, '');
    // var number = new Number(numberString.replace(dec, ".").replace(neg, "-"));
    var number = new Number(numberString);

    return jQuery._formatNumber(number, options, suffix, prefix, negativeInFront);
  };

  /**
   * Formats a Number object into a string, using the given formatting options
   *
   * @param {Object} numberString
   * @param {Object} options
   */
  jQuery._formatNumber = function(number, options, suffix, prefix, negativeInFront) {
    var options = jQuery.extend({}, jQuery.fn.formatNumber.defaults, options);
    var formatData = formatCodes(options.locale.toLowerCase(), options.isFullLocale);

    var dec = formatData.dec;
    var group = formatData.group;
    var neg = formatData.neg;

    var forcedToZero = false;
    if (isNaN(number)) {
      if (options.nanForceZero == true) {
        number = 0;
        forcedToZero = true;
      } else
        return null;
    }

    // special case for percentages
    if (suffix == '%')
      number = number * 100;

    var returnString = '';
    if (options.format.indexOf('.') > -1) {
      var decimalPortion = dec;
      var decimalFormat = options.format.substring(options.format.lastIndexOf('.') + 1);

      // round or truncate number as needed
      if (options.round == true)
        number = new Number(number.toFixed(decimalFormat.length));
      else {
        var numStr = number.toString();
        numStr = numStr.substring(0, numStr.lastIndexOf('.') + decimalFormat.length + 1);
        number = new Number(numStr);
      }

      var decimalValue = number % 1;
      var decimalString = new String(decimalValue.toFixed(decimalFormat.length));
      decimalString = decimalString.substring(decimalString.lastIndexOf('.') + 1);

      for (var i = 0; i < decimalFormat.length; i++) {
        if (decimalFormat.charAt(i) == '#' && decimalString.charAt(i) != '0') {
          decimalPortion += decimalString.charAt(i);
          continue;
        } else if (decimalFormat.charAt(i) == '#' && decimalString.charAt(i) == '0') {
          var notParsed = decimalString.substring(i);
          if (notParsed.match('[1-9]')) {
            decimalPortion += decimalString.charAt(i);
            continue;
          } else
            break;
        } else if (decimalFormat.charAt(i) == '0')
          decimalPortion += decimalString.charAt(i);
      }
      returnString += decimalPortion;
    } else
      number = Math.round(number);

    var ones = Math.floor(number);
    if (number < 0)
      ones = Math.ceil(number);

    var onesFormat = '';
    if (options.format.indexOf('.') == -1)
      onesFormat = options.format;
    else
      onesFormat = options.format.substring(0, options.format.indexOf('.'));

    var onePortion = '';
    if (!(ones == 0 && onesFormat.substr(onesFormat.length - 1) == '#') || forcedToZero) {
      // find how many digits are in the group
      var oneText = new String(Math.abs(ones));
      var groupLength = 9999;
      if (onesFormat.lastIndexOf(',') != -1)
        groupLength = onesFormat.length - onesFormat.lastIndexOf(',') - 1;
      var groupCount = 0;
      for (var i = oneText.length - 1; i > -1; i--) {
        onePortion = oneText.charAt(i) + onePortion;
        groupCount++;
        if (groupCount == groupLength && i != 0) {
          onePortion = group + onePortion;
          groupCount = 0;
        }
      }

      // account for any pre-data padding
      if (onesFormat.length > onePortion.length) {
        var padStart = onesFormat.indexOf('0');
        if (padStart != -1) {
          var padLen = onesFormat.length - padStart;

          // pad to left with 0's or group char
          var pos = onesFormat.length - onePortion.length - 1;
          while (onePortion.length < padLen) {
            var padChar = onesFormat.charAt(pos);
            // replace with real group char if needed
            if (padChar == ',')
              padChar = group;
            onePortion = padChar + onePortion;
            pos--;
          }
        }
      }
    }

    if (!onePortion && onesFormat.indexOf('0', onesFormat.length - 1) !== -1)
      onePortion = '0';

    returnString = onePortion + returnString;

    // handle special case where negative is in front of the invalid characters
    if (number < 0 && negativeInFront && prefix.length > 0)
      prefix = neg + prefix;
    else if (number < 0)
      returnString = neg + returnString;

    if (!options.decimalSeparatorAlwaysShown) {
      if (returnString.lastIndexOf(dec) == returnString.length - 1) {
        returnString = returnString.substring(0, returnString.length - 1);
      }
    }
    returnString = prefix + returnString + suffix;
    return returnString;
  };


  /*	Parsing Methods	*/


  /**
   * Parses a number of given format from the element and returns a Number object.
   * @param {Object} options
   */
  jQuery.fn.parseNumber = function(options, writeBack, giveReturnValue) {
    // enforce defaults
    if (writeBack == null)
      writeBack = true;
    if (giveReturnValue == null)
      giveReturnValue = true;

    // get text
    var text;
    if (jQuery(this).is(':input'))
      text = new String(jQuery(this).val());
    else
      text = new String(jQuery(this).text());

    // parse text
    var number = jQuery.parseNumber(text, options);

    if (number) {
      if (writeBack) {
        if (jQuery(this).is(':input'))
          jQuery(this).val(number.toString());
        else
          jQuery(this).text(number.toString());
      }
      if (giveReturnValue)
        return number;
    }
  };

  /**
   * Parses a string of given format into a Number object.
   *
   * @param {Object} string
   * @param {Object} options
   */
  jQuery.parseNumber = function(numberString, options) {
    var options = jQuery.extend({}, jQuery.fn.parseNumber.defaults, options);
    var formatData = formatCodes(options.locale.toLowerCase(), options.isFullLocale);

    var dec = formatData.dec;
    var group = formatData.group;
    var neg = formatData.neg;

    var valid = '1234567890.-';

    // now we need to convert it into a number
    while (numberString.indexOf(group) > -1)
      numberString = numberString.replace(group, '');
    numberString = numberString.replace(dec, '.').replace(neg, '-');
    var validText = '';
    var hasPercent = false;
    if (numberString.charAt(numberString.length - 1) == '%' || options.isPercentage == true)
      hasPercent = true;
    for (var i = 0; i < numberString.length; i++) {
      if (valid.indexOf(numberString.charAt(i)) > -1)
        validText = validText + numberString.charAt(i);
    }
    var number = new Number(validText);
    if (hasPercent) {
      number = number / 100;
      var decimalPos = validText.indexOf('.');
      if (decimalPos != -1) {
        var decimalPoints = validText.length - decimalPos - 1;
        number = number.toFixed(decimalPoints + 2);
      } else {
        number = number.toFixed(validText.length - 1);
      }
    }

    return number;
  };

  jQuery.fn.parseNumber.defaults = {
    locale: 'us',
    decimalSeparatorAlwaysShown: false,
    isPercentage: false,
    isFullLocale: false
  };

  jQuery.fn.formatNumber.defaults = {
    format: '#,###.00',
    locale: 'us',
    decimalSeparatorAlwaysShown: false,
    nanForceZero: true,
    round: true,
    isFullLocale: false
  };

  Number.prototype.toFixed = function(precision) {
    return jQuery._roundNumber(this, precision);
  };

  jQuery._roundNumber = function(number, decimalPlaces) {
    var power = Math.pow(10, decimalPlaces || 0);
    var value = String(Math.round(number * power) / power);

    // ensure the decimal places are there
    if (decimalPlaces > 0) {
      var dp = value.indexOf('.');
      if (dp == -1) {
        value += '.';
        dp = 0;
      } else {
        dp = value.length - (dp + 1);
      }

      while (dp < decimalPlaces) {
        value += '0';
        dp++;
      }
    }
    return value;
  };


  $('.rangeSlider').each(function() {
    var $this = $(this);
    var settings = {};

    if (typeof $this.data('settings') == 'object') {
      settings = $this.data('settings');
    }

    $this.slider(settings);
  });
};
