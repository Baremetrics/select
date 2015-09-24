'use strict';

function Select(options) {
  this.cloud = $(options.cloud);
  this.tags = options.tags;

  var self = this;

  $(this.tags).each(function(i, d) {
    self.addTagHTML(d);
  });
  
  $('.bm-tag', this.cloud).each(function() {
    self.addTagActions($(this));
  });
}

Select.prototype.addTagActions = function(tag) {
  var self = this;

  var tag = {
    self: tag,
    drop: null,
    dropdown: null
  }

  $('.bm-drop, .bm-title', tag.self).off('click').click(function() {
    if (!tag.self.hasClass('bm-open')) {
      tag.drop = tag.self.addClass('bm-open');
      tag.dropdown = $('.bm-dropdown', tag.self).show();
    } else {
      self.closeDrop(tag);
    }

    $('.bm-item', tag.dropdown).off('click').click(function() {
      var new_value = $(this).html();
      var new_query = $(this).data('query');

      $('span', tag.drop).data('query', new_query).html(new_value);
      tag.self.addClass('bm-active');

      console.log(tag.dropdown.data('type'));
    });

    $('.bm-value', tag.self).off('focus').focus(function() {
      self.closeDrop(tag);
    });

    self.cloud.off('click').click(function(event) {
      $('html').one('click', function() {
        self.closeDrop(tag);
      });

      event.stopPropagation();
    });
  });
}

Select.prototype.closeDrop = function(tag) {
  tag.drop.removeClass('bm-open');
  tag.dropdown.hide();
}

Select.prototype.addTagHTML = function(object) {
  var HTML = '<div class="bm-tag">'+
    '<div class="bm-title bm-cell">'+ object.title +'</div>'+
    '<div class="bm-drop bm-cell"><span>All</span> <i></i>';

  var type = object.type ? object.type() : bmSingle();

  HTML += '<ul class="bm-dropdown" data-type="'+ type +'" style="display:none;">';

  $.each(object.options, function(i, d) {
    if (i == 0) {
      HTML += '<li class="bm-item" data-query="all">All</li>';
    }
    
    var query = d.query || d.title.replace(/[^a-zA-Z]/g, '').toLowerCase()

    HTML += '<li class="bm-item" data-query="'+ query +'">'+ d.title +'</li>';
  });

  HTML += '</ul></div>';

  if (type == this.Input) {
    HTML += '<div class="bm-value bm-cell" style="display:none;" contenteditable placeholder="value"></div>';
  }

  HTML += '</div>';

  $(this.cloud).append(HTML);
}

function bmInput() {
  return 'input';
}
function bmMulti() {
  return 'multi';
}
function bmSingle() {
  return 'single';
}