'use strict';

$(function() {
  var filters = new Select({
    cloud: '.select',
    tags: [
      {
        title: 'Name',
        type: bmInput,
        options: [
          {
            title: 'Contains',
            query: 'contain',
          },
          {
            title: 'More then',
            query: 'gte',
          }
        ]
      },
      {
        title: 'Employees',
        type: bmInput,
        options: [
          {
            title: 'Contains',
            query: 'contain',
          },
          {
            title: 'Less then',
            query: 'lte',
          }
        ]
      },
      {
        title: 'Tech',
        type: bmMulti,
        options: [
          {
            title: 'Python',
          },
          {
            title: 'MongoDB',
          },
          {
            title: 'Node',
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