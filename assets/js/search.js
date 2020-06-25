---

---
// Based on a script by Kathie Decora : katydecorah.com/code/lunr-and-jekyll/

// Create the lunr index for the search
var index = elasticlunr(function () {
  this.addField('title')
  this.addField('author')
  this.addField('publisher')
  this.addField('text')
  this.addField('date')
  this.setRef('id')
});

// Add to this index the proper metadata from the Jekyll content
{% assign count = 0 %}{% for text in site.data.meta %}
index.addDoc({
  title: {{text.title | jsonify}}.replace(/[.,!\n]/g, " ").toLowerCase().replace(/([a-zA-Z])'([a-zA-Z])/g, '$1$2').replace(/\s{2,}/g, " "),
  author: {{text.author | jsonify}}.replace(/[.,!\n]/g, " ").toLowerCase().replace(/([a-zA-Z])'([a-zA-Z])/g, '$1$2').replace(/\s{2,}/g, " "),
  publisher: {{text.pub | jsonify}}.replace(/[.,!\n]/g, " ").toLowerCase().replace(/([a-zA-Z])'([a-zA-Z])/g, '$1$2').replace(/\s{2,}/g, " "),
  text: {{text.text | jsonify}}.replace(/[.,!\n]/g, " ").toLowerCase().replace(/([a-zA-Z])'([a-zA-Z])/g, '$1$2').replace(/\s{2,}/g, " "),
  date: {{text.date | jsonify}},
  id: {{count}}
});{% assign count = count | plus: 1 %}{% endfor %}

// Builds reference data (maybe not necessary for us, to check)
var store = [{% for text in site.data.meta %}{
  "title": {{text.title | jsonify}},
  "author": {{text.author | jsonify}},
  "publisher": {{ text.pub | jsonify}},
  "text": {{text.text | jsonify}},
  "date": {{text.date | jsonify}},
  "link": {{text.link | jsonify}}
}
{% unless forloop.last %},{% endunless %}{% endfor %}]

console.log(store);
console.log(index);

console.log(typeof store);
console.log(typeof index);

// Query
var qd = {}; // Gets values from the URL
location.search.substr(1).split("&").forEach(function(item) {
    var s = item.split("="),
        k = s[0],
        v = s[1] && decodeURIComponent(s[1]);
    (k in qd) ? qd[k].push(v) : qd[k] = [v]
});

function doSearch() {
  var resultdiv = $('#results');
  var query = $('input#search').val();

  
  //check query string against index and use lunr query boosting, expanding tokens, and boolean values
  var result = index.search(query, {
    fields: {
        title: {boost: 2},
        text: {boost: 1}
    },
    bool: "OR",
    expand: true
  });

  resultdiv.empty();
  if (result.length == 0) {
    resultdiv.append('<p class="">No results found.</p>');
  } else if (result.length == 1) {
    resultdiv.append('<p class="">Found '+result.length+' result</p>');
  } else {
    resultdiv.append('<p class="">Found '+result.length+' results</p>');
  }
  // Loop through, match, and add results
  for (var item in result) {
    var ref = result[item].ref;
    var searchitem = `<div class="result"><h3><a target="_blank" href="{{ site.baseurl }}${store[ref].link}/?q=${query}">${store[ref].title}</a></h3><p>${store[ref].text.substring(0, 250)}...</p></div>`;
    resultdiv.append(searchitem);
  }
}
console.log(window.location.href)
$(document).ready(function() {
  if (qd.q) {
    $('input#search').val(qd.q[0]);
    doSearch();
  }
  $('input#search').on('keyup', doSearch);
});