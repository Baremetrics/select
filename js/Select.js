'use strict';

function Select(options) {
  if (!options) 
    return true;

  this.cloud = $(options.cloud);
  this.tags = options.tags;

  var self = this;

  // Make the tags
  $(this.tags).each(function(i, d) {
    self.addSelectHTML(d);
  });
  
  $('.bm-tag', this.cloud).each(function(i) {
    self.addSelectActions($(this)); // Add actions to the new tags
    self.addSelectValues($(this), self.tags[i].options || [{selected: self.tags[i].selected}]); // Add values to the new tags
  });
}

Select.prototype.addSelectActions = function(tag) {
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

    if ($('.bm-item', target).length) {
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
              self.addSelectActions(tag);
            } else {
              $('span', target).data('query', 'all').html('All');
              $('.bm-drop', tag).not(target).remove();
              $('.bm-dropdown li', tag).removeClass('bm-disabled');

              return true;
            }

            $('.bm-drop span', tag).each(function() {
              var query = $(this).data('query');
              $('.bm-dropdown', tag).find('[data-query="'+ query +'"]').addClass('bm-disabled');
            });
          } else if (new_query == 'all') {
            target.removeClass('bm-inner');
            $('.bm-drop', tag).not(target).remove();
            $('.bm-dropdown li', tag).removeClass('bm-disabled');
          } else {
            $('.bm-dropdown li', tag).removeClass('bm-disabled');

            $('.bm-drop span', tag).each(function() {
              var query = $(this).data('query');
              $('.bm-dropdown', tag).find('[data-query="'+ query +'"]').addClass('bm-disabled');
            });
          }
        }
      });
    } else {
      input.focus();
    }

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
        target.removeClass('bm-inner').find('span').data('query', 'none').html('None');
      } else if (!target.parent().find('.bm-more').length) {
        var target_clone = target.clone();

        target_clone.removeClass('bm-inner').addClass('bm-more');
        target_clone.find('span').html('More');

        target.parent().find('.bm-drop:last').after(target_clone);
        target_clone.prev().addClass('bm-inner');
        target.remove();

        self.addSelectActions(tag);
      } else {
        target.remove();
      }
    } else if (dropdown_type == 'input') {
      next.hide();
      target.parent().removeClass('bm-active');
      target.removeClass('bm-inner').find('span').data('query', 'none').html('None');
    } else {
      next.remove();
      target.parent().removeClass('bm-active');
      target.removeClass('bm-inner').find('span').data('query', 'none').html('None');
    }
  });

  $('[contenteditable]', tag).off('keyup keydown input').on('keyup keydown input', function() {
    var target = $(this).parent();
    var str = $(this).html().replace(/<br\s*[\/]?>/gi, '');

    if (str.length > 0) {
      target.has('.bm-drop').length ? false : target.addClass('bm-active');
      $(this).removeClass('bm-empty');
    } else {
      target.has('.bm-drop').length ? false : target.removeClass('bm-active');
      $(this).empty().addClass('bm-empty');
    }
  });
}

Select.prototype.addSelectValues = function(tag, options) {
  if (options) {
    $.each(options, function(i, d) {
      if (d.selected) {
        if (d.query || d.title) {
          var trigger = $('.bm-drop', tag).last().trigger('click');
          var query = d.query || d.title.replace(/[^a-zA-Z]/g, '').toLowerCase();

          $('[data-query="'+ query +'"]', trigger).trigger('click');
        } else {
          tag.addClass('bm-active');
        }

        $('.bm-input', tag).removeClass('bm-empty').html(d.selected);
      }
    });
  }

  window.setTimeout(function() {
    $('.bm-input').blur();
  }, 0);
}

Select.prototype.closeDrop = function(tag) {
  $('.bm-drop', tag).removeClass('bm-open');
  $('.bm-dropdown', tag).hide();
}

Select.prototype.addSelectHTML = function(object) {
  var HTML = '<div class="bm-tag">'+
    '<div class="bm-title bm-cell">'+ object.title +'</div>';

  var type = object.type ? this[object.type]() : this.bmSingle();

  if (object.options) {
    HTML += '<div class="bm-drop bm-cell"><i class="bm-close"></i> <span data-query="none">None</span> <i class="bm-caret"></i><ul class="bm-dropdown" data-type="'+ type +'" style="display:none;">';

    $.each(object.options, function(i, d) {
      if (i == 0 && type == 'multi') {
        HTML += '<li class="bm-item" data-query="all">All</li>';
      }
      
      var query = d.query || d.title.replace(/[^a-zA-Z]/g, '').toLowerCase();

      HTML += '<li class="bm-item" data-query="'+ query +'">'+ d.title +'</li>';
    });

    HTML += '</ul></div>';
  }

  if (type == 'input') {
    HTML += '<div class="bm-input bm-empty bm-cell" placeholder="'+ (object.placeholder || 'Enter value...') +'"'+ (object.options ? 'style="display:none;"' : '') +'contenteditable></div>';
  }

  HTML += '</div>';

  $(this.cloud).append(HTML);
}

Select.prototype.addResultHTML = function(object) {
  var options = $.map(object.options || [{selected: object.selected}], function(d) {
    return {
      title: d.title,
      selected: d.selected || false
    }
  }).filter(function(e) {return e.selected != false});

  if (!options.length)
    return false;

  var HTML = '<div class="bm-tag bm-final">'+
    '<div class="bm-title bm-cell">'+ object.title +'</div>';

  if (this[object.type] == this.bmInput) {
    if (options[0].title)
      HTML += '<div class="bm-modifier bm-cell">'+ options[0].title +'</div>';

    HTML += '<div class="bm-values bm-cell">'+ (Number(options[0].selected) ? options[0].selected : '"'+ options[0].selected +'"') +'</div>';
  } else {
    HTML += '<div class="bm-values bm-cell">';

    $.each(options, function(i, d) {
      HTML += (i == 0 ? '' : ', ') + d.title;
    });

    HTML += '</div>';
  }

  HTML += '</div>';

  return HTML;
}

Select.prototype.call = function() {
  var self = this;
  var tags = self.tags;

  $('.bm-tag', this.cloud).each(function(i, d) {
    var title = $('.bm-title', d).html();
    var index = tags.map(function(e){return e.title}).indexOf(title);
    var selected = $.makeArray($('.bm-drop:not(.bm-more) span', d).map(function() {
      return $(this).data('query');
    }));

    if (tags[index].options) {
      $.each(tags[index].options, function(j, e) {
        var query = e.query || e.title.replace(/[^a-zA-Z]/g, '').toLowerCase();

        if (selected.indexOf(query) != -1 || selected[0] == 'all') {
          var input = $('.bm-input', d).html();

          tags[index].options[j].selected = input || true;
        } else {
          tags[index].options[j].selected = false;
        }
      });
    } else {
      var input = $('.bm-input', d).html();
      tags[index].selected = input || false
    }
  });

  return tags;
}

Select.prototype.reset = function() {
  $('.bm-active', this.cloud).each(function() {
    var d = $(this).removeClass('bm-active');
    
    $('.bm-drop', d).not(':first').remove();
    $('.bm-dropdown li', d).removeClass('bm-disabled');

    d.has('.bm-drop').length ? 
      $('.bm-input', d).hide() : 
      $('.bm-input', d).addClass('bm-empty').empty();

    $('.bm-drop:first', d).removeClass('bm-active bm-inner').find('span').data('query', 'none').html('None');
  });
}

Select.prototype.bmInput = function() {
  return 'input';
}

Select.prototype.bmMulti = function() {
  return 'multi';
}

Select.prototype.bmSingle = function() {
  return 'single';
}