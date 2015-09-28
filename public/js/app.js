'use strict';

$(function() {
  var filters = new Select({
    cloud: '.bm-select',
    submit: '.bm-submit',
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
  
  $('.bm-reset').click(function() {
    filters.reset();
  });

  $('.bm-submit').click(function() {
    console.log( filters.call() );
  });
});