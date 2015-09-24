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
    drop: $('.bm-drop', tag),
    dropdown: $('.bm-dropdown', tag),
    input: $('.bm-input', tag)
  }

  $('.bm-drop, .bm-title', tag.self).off('click').click(function() {
    if (!tag.drop.hasClass('bm-open')) {
      tag.drop.addClass('bm-open');
      tag.dropdown.show();
    } else {
      self.closeDrop(tag);
    }

    $('.bm-item', tag.dropdown).off('click').click(function() {
      var new_value = $(this).html();
      var new_query = $(this).data('query');
      var dropdown_type = tag.dropdown.data('type');

      $('span', tag.drop).data('query', new_query).html(new_value);
      tag.self.addClass('bm-active');

      if (dropdown_type == 'input') {
        if (new_query == 'all') {
          tag.drop.removeClass('bm-selected');
          tag.input.hide();
        } else {
          tag.drop.addClass('bm-selected');
          tag.input.off('focus').focus(function() {
            self.closeDrop(tag);
          }).show();
        }
      }

      else if (dropdown_type == 'multi') {
        var drop_clone = $(tag.drop).clone();
        $(tag.drop).after(drop_clone);
      }
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

  if (type == 'input') {
    HTML += '<div class="bm-input bm-cell" style="display:none;" contenteditable placeholder="Enter value..."></div>';
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