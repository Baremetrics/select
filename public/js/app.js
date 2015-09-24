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
            type: String,
          },
          {
            title: 'More then',
            query: 'gt',
            type: Number,
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
            type: String,
          },
          {
            title: 'Less then',
            query: 'lt',
            type: Number,
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