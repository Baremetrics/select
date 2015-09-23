'use strict';

function Select() {
  this.cloud = $('.bm-select');

  var self = this;

  $('.bm-tag', this.cloud).each(function(i) {
    self.addTag(this);
  });
}

Select.prototype.addTag = function(tag) {
  var self = this;
  var tag = {
    self: tag,
    drop: null,
    dropdown: null
  }

  $('.bm-drop', tag.self).click(function() {
    tag.drop = $(this).addClass('bm-open');
    tag.dropdown = $(this).siblings('.bm-dropdown').show();

    $('.bm-item', tag.dropdown).click(function() {
      var new_value = $(this).html();
      $('span', tag.drop).html(new_value);
      self.closeDrop(tag);
    });

    $('.bm-value', tag.self).focus(function() {
      self.closeDrop(tag);
    });

    self.cloud.click(function(event) {
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