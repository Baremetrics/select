# [Baremetrics](https://baremetrics.com/) Custom Selection Picker
_[Baremetrics](https://baremetrics.com) provides zero-setup subscription analytics & insights for Stripe, Braintree, Recurly and any other subscription source! **[Get started today!](https://baremetrics.com)**_

---

The Baremetrics custom selection picker is a glorified select box solution. It's super flexible and allows many different types and ranges of complex selections while at the end of the day generating a very simple, concise JSON object which you can use for whatever.

Design by [Chris Meeks](https://dribbble.com/ChrisMeeks)  
Code by [Tyler van der Hoeven](https://github.com/tyvdh)

[View a demo](http://baremetrics.github.io/select)  
<!--[View in a live production app](https://demo.baremetrics.com/sales/search)-->

![screenshot2](http://tyler.link/dxB4/Screen%20Shot%202015-11-30%20at%201.14.52%20PM.png)
![screenshot1](http://tyler.link/dOVh/Screen%20Shot%202015-09-30%20at%203.51.46%20PM.png)
![screenshot3](http://tyler.link/dOe2/Screen%20Shot%202015-09-30%20at%203.51.00%20PM.png)

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

// Also just for kicks here are a couple actions
// I'm using in the demo to reset the filter selections
// and spit out the result html

$('.reset').click(function() {

  // Resets all the filters to 'None'
  filters.reset();
});

$('.submit').click(function() {
  
  // This gives you the selected tag JSON
  var filters_array = filters.call();

  // Clears out any existing tags in the result cloud
  var result_cloud = $('.result').empty();

  // Loops over the results and adds each one to the result cloud
  $.each(filters_array, function(i, d) {
    var HTML = filters.addResultHTML(d);
    result_cloud.append(HTML);
  });
});
```

## Params

### Layer One (`cloud` & `tag`)
`Select` allows for one object argument with two keys, `cloud` and `tags`.

- `cloud:`
  - The identifier for where we should generate the select filter tags
- `tags:`
  - An array of tag objects

### Layer Two (`title`, `type` & `options`)
A tag object has three keys. `title`, `type` and `options`

- `title:`
  - The title of the tag
- `type:`
  - One of either `'bmInput'`, `'bmMulti'` or `'bmSingle'` 
  - Default is `'bmSingle'`
- `options:`
  - Array of dropdown objects for this tag
- `placeholder:`
  - If `bmInput` without an options array you can set a placeholder for the input field
- `selected:`
  - If `bmInput` without an options array  you can set a pre-selected value for the input field

### Layer Three (`title`, `query` & `selected`)
The options array has three allowable keys. `title`, `query` or `selected`

- `title:` 
  - The title for the dropdown item
- `query:`
  - The shorthand name for this selection. 
  - Defaults to lowercase alpha char regex
- `selected:`
  - If `'bmInput'`, this is the value to pre-fill the input div with
  - Otherwise it's just a boolean to pre-select this item or not 
  - Default obviously is `false`


## Functions
Now that we're all set up with filters, how do we access the values for use throughout the rest of our application? Easy!

### `[Select instance].reset()`
First and easiest is `[Select instance].reset()` which will just clear all filters of their current selections. Note however this does not automatically reset the values unless a `[Select instance].call()` is also called. This function just visually clears the playing field.

### `[Select instance].call()`
The second function is `[Select instance].call()`. This will return a clone of the original tags array you passed to the `Select` instance. The only thing which will be updated is where the `selected` keys and values are. Thus you could save this return array back to subsequent calls of the `Select` object as a sort of "what did I search for last" type deal. We do this exact thing in the Baremetrics app using `localStorage`. The more common use though obviously is to use this as your option in a call back to the server for use in some type of API call.

### `[Select instance].addResultHTML([one_tag_object])`
The last function you'll likely want to make use of is the `[Select instance].addResultHTML([one_tag_object])`. What this allows you to do is pass in one of the tag objects from either the `call()` return or even the original object and generate a sort of static or dumb tag. In the [demo](http://baremetrics.github.io/select/) this is the function that is called when you click the "Submit" button. It only takes one object at a time though so you'll likely want to create an each loop if you plan on generating a tag cloud of all the return search objects.

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
