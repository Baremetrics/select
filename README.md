# [Baremetrics](https://baremetrics.com/) Date Range Picker
_[Baremetrics](https://baremetrics.com) provides one-click analytics & insights for Stripe. **[Get started today!](https://baremetrics.com)**_

---

The Baremetrics custom selection picker is a glorified select box solution. It's super flexible and allows many different types and ranges of complex selections while at the end of the day generating a very simple, concise JSON object which you can use for whatever.

Design by [Chris Meeks](https://dribbble.com/ChrisMeeks)  
Code by [Tyler van der Hoeven](https://github.com/tyvdh)

[View a demo](http://baremetrics.github.io/select)  
<!--[View in a live production app](https://demo.baremetrics.com/sales/search)-->

![screenshot1](http://tyler.link/dNyy/Screen%20Shot%202015-09-29%20at%2012.28.39%20PM.png)
![screenshot2](http://tyler.link/dNip/Screen%20Shot%202015-09-29%20at%2012.27.56%20PM.png)
![screenshot3](http://tyler.link/dNiH/Screen%20Shot%202015-09-29%20at%2012.29.19%20PM.png)

## Installing
Using the select filter tags is super straight forward, you just need to target a div with the class of `bm-select` where your filter options will generate.

We've also got the option to spit out a separate filter cloud for non selectable results. That too needs a `bm-select` class.

In the demo I'm using:
```html
<div class="select bm-select"></div>
<!--
<button class="reset">Reset</button>
<button class="submit">Submit</button>
-->
<div class="result bm-select"></div>
```

Once you've got the div's ready all you've gotta do is create an instance of the `Select` object with all the tags you'd like to generate.

```js
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

// Also just for kicks here are a couple actions
// I'm using in the demo to reset the filter selections
// and spit out the result html

$('.reset').click(function() {
  filters.reset();
});

$('.submit').click(function() {
  var filters_array = filters.call(); // This gives you the selected tag JSON
  var result_cloud = $('.result').empty(); // Clears out any existing tags in the result cloud

  $.each(filters_array, function(i, d) { // Loops over the results and adds each one to the result cloud
    var HTML = filters.addResultHTML(d);
    result_cloud.append(HTML);
  });
});
```

### Params
`Select` allows for one object argument with two keys, `cloud` and `tags`. Cloud is the identifier for where we should generate the select filter tags. Tags is an array of tag objects.

A tag object has three keys. `title`, `type` or `options`  
`title:` The title of the tag  
`type:` One of either `'bmInput'`, `'bmMulti'` or `'bmSingle'` (default is `'bmSingle'`)  
`options:` Array of dropdown objects for this tag

The options array has three allowable keys. `title`, `query` or `selected`  
`title:` The title for the dropdown item  
`query:` The shorthand name for this selection. (defaults to lowercase alpha regex)  
`selected:` If `'bmInput'`, this is the value to pre-fill the input div with. Otherwise it's just a boolean to pre-select this item or not (default obviously is false)

---

## Developing

I've included my signature gulpfile too so be sure and take a look at that as well.

```bash
$ cd <project directory>
$ npm install
$ gulp
```

I also use [pow](http://pow.cx/) and the [powder gem](https://github.com/Rodreegez/powder) to run my local dev environments but however you plan on wrangling that the gulpfile turns on a livereload server so as long as you have the files serving somehow any changes you make will show up instantly.

## Dependencies
- [jQuery](https://jquery.com/)