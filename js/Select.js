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

  $('.bm-title, .bm-drop', tag).off('click').click(function() {
    var target = $(this).hasClass('bm-drop') ? $(this) : $('.bm-drop', tag).first();
    var dropdown_type = $('.bm-dropdown', target).data('type');
    var input = $('.bm-input', tag);

    if (!target.hasClass('bm-open')) {
      self.closeDrop(tag);
      target.addClass('bm-open');
      $('.bm-dropdown', target).show();
    } else {
      self.closeDrop(tag);
    }

    $('.bm-item', target).off('click').click(function() {
      var new_value = $(this).html();
      var new_query = $(this).data('query');

      $('span', target).data('query', new_query).html(new_value);
      target.removeClass('bm-more');
      tag.addClass('bm-active');

      if (dropdown_type == 'input') {
        target.removeClass('bm-inner');

        if (new_query == 'all') {
          input.hide();
        } else {
          target.addClass('bm-inner');
          input
            .show()
            .off('focus')
            .focus()
            .off('focus')
            .focus(function() {self.closeDrop(tag)});
        }
      }

      else if (dropdown_type == 'multi') {
        if (new_query != 'all' && !target.next().length) {
          var used_tags = $('.bm-drop', tag).length;
          var unused_tags = $('.bm-dropdown:first li:nth-child(1n+2)', tag).length;
          var drop_clone = $(target).clone();

          if (used_tags != unused_tags) {
            drop_clone.removeClass('bm-open').addClass('bm-more');
            drop_clone.find('.bm-dropdown').hide();
            drop_clone.find('span').html('More');

            target.addClass('bm-inner');
            $(target).after(drop_clone);
            self.addTagActions(tag);
          }

          $('.bm-drop span', tag).each(function() {
            var query = $(this).data('query');
            $('.bm-dropdown', tag).find('[data-query="'+ query +'"]').addClass('bm-disabled');
          });

        } else if (new_query == 'all') {
          target.removeClass('bm-inner');
          $('.bm-drop', tag).not(target).remove();
          $('.bm-dropdown li', tag).removeClass('bm-disabled');
        }
      }
    });

    self.cloud.off('click').click(function(event) {
      $('html').one('click', function() {
        self.closeDrop(tag);
      });

      event.stopPropagation();
    });
  });

  $('.bm-close', tag).off('click').click(function() {
    var target = $(this).parent();
    var prev = target.prev();
    var next = target.next();
    var query = target.find('span').data('query');
    var dropdown_type = $('.bm-dropdown', target).data('type');

    target.parent().find('.bm-dropdown').find('[data-query="'+ query +'"]').removeClass('bm-disabled');

    if (dropdown_type == 'multi') {
      if (prev.hasClass('bm-title') && (next.hasClass('bm-more') || !next.length)) {
        next.remove();
        target.parent().removeClass('bm-active');
        target.removeClass('bm-inner').find('span').html('All');
      } else if (!target.parent().find('.bm-more').length) {
        var target_clone = target.clone();

        target_clone.removeClass('bm-inner').addClass('bm-more');
        target_clone.find('span').html('More');

        target.parent().find('.bm-drop:last').after(target_clone);
        target_clone.prev().addClass('bm-inner');
        target.remove();

        self.addTagActions(tag);
      } else {
        target.remove();
      }
    } else if (dropdown_type == 'input') {
      next.hide();
      target.parent().removeClass('bm-active');
      target.removeClass('bm-inner').find('span').html('All');
    } else {
      next.remove();
      target.parent().removeClass('bm-active');
      target.removeClass('bm-inner').find('span').html('All');
    }
  });
}

Select.prototype.closeDrop = function(tag) {
  $('.bm-drop', tag).removeClass('bm-open');
  $('.bm-dropdown', tag).hide();
}

Select.prototype.addTagHTML = function(object) {
  var HTML = '<div class="bm-tag">'+
    '<div class="bm-title bm-cell">'+ object.title +'</div>'+
    '<div class="bm-drop bm-cell"><i class="bm-close"></i> <span>All</span> <i class="bm-caret"></i>';

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