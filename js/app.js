'use strict';

$(function() {
  var filters = new Select({
    cloud: '.select',
    tags: [
      {
        title: 'Name',
        type: 'bmInput',
        options: [
          {
            title: 'Contains',
            query: 'with',
            selected: 'Metrics',
          },
          {
            title: 'Doesn\'t Contain',
            query: 'without',
          }
        ]
      },
      {
        title: 'Price',
        type: 'bmInput',
        // selected: '$129.99',
        placeholder: 'e.g. $99.99'
      },
      {
        title: 'Tech',
        type: 'bmMulti',
        options: [
          {
            title: 'Python',
            selected: true,
          },
          {
            title: 'MongoDB',
            selected: true,
          },
          {
            title: 'Node',
          },
          {
            title: 'PHP',
          },
          {
            title: 'Meteor',
          },
          {
            title: 'MySQL',
          },
          {
            title: 'Ruby',
          }
        ]
      },
      {
        title: 'Billing Interval',
        options: [
          {
            title: 'Annual'
          },
          {
            title: 'Monthly'
          }
        ]
      }
    ]
  });
  
  $('.reset').click(function() {
    filters.reset();
  });

  $('.submit').click(function() {
    var filters_array = filters.call();
    var result_cloud = $('.result').empty();

    $.each(filters_array, function(i, d) {
      var HTML = filters.addResultHTML(d);
      result_cloud.append(HTML);
    });
  });
});