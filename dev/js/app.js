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
        title: 'Employees',
        type: 'bmInput',
        options: [
          {
            title: 'More then',
            query: 'gte',
          },
          {
            title: 'Less then',
            query: 'lte',
          }
        ]
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
        title: 'Continent',
        options: [
          {
            title: 'United States',
            query: 'us',
            selected: true,
          },
          {
            title: 'Europe',
            query: 'eu',
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