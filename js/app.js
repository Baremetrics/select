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
            query: 'contain',
            selected: 'Metrics',
          },
          {
            title: 'More then',
            query: 'gte',
          }
        ]
      },
      {
        title: 'Employees',
        type: 'bmInput',
        options: [
          {
            title: 'Contains',
            query: 'contain',
          },
          {
            title: 'Less then',
            query: 'lte',
            selected: 20,
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
            selected: true,
          }
        ]
      },
      {
        title: 'Continent',
        options: [
          {
            title: 'United States',
            query: 'us',
          },
          {
            title: 'Europe',
            query: 'eu',
            selected: true,
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