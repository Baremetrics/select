'use strict';

$(function() {
  new Select({
    cloud: '.bm-select',
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
            query: 'gt',
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
            query: 'lt',
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
})