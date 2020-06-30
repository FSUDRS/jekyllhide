# JekyllHIDE
A jekyll static site template that is a Humanities Interface for Distributed Editions. It takes collections of TEI files  and transforms and distributes them into individual custom-styled digital editions.

## Dependencies
JekyllHIDE runs on Jekyll so you need to have Ruby as well as a ruby manager such as RVM or rbenv installed also. Check the [Ruby docs](https://www.ruby-lang.org/en/documentation/installation/) for instructions on how to install Ruby on your OS and a list of all Ruby managers. You will also need to have the Ruby gems jekyll and bundler installed in order to run any of the setup commands, you can do this by running `gem install jekyll bundler` inside your JekyllHIDE directory. 

## Getting Started
- Run `bundle install` in the JekyllHIDE root directory to install all necessary gems

- Place all your TEI files into `/TEI`

- Decide what your collection will be named and update _config.yaml with its name and with output set to true like below. You will also need to comment out the `output: true` for the odfn demo collection:
``` 
collections:
    odfn:
        #output : true
    your-collection-name:
        output : true
```

- Run `rake hide:json[YOUR-COLLECTION-NAME]` to generate a json representation of your collection for searching and TEI transformation as well as create a jekyll collection folder for you

- Run `rake hide:pages[YOUR-COLLECTION-NAME]` to generate markdown files inside that jekyll collection folder to populate the website

- Edit line 8 in the collections.html file to reflect the name of your collection and not the test collection odfn:
```
{% for work in site.your-collection-name %}
    <li><a href={{work.url}}>{{work.filename}}</a></li>
{% endfor %}
```

- Run `bundle exec jekyll serve` and jekyll will generate your website under a new directory, "_site", and start running it at localhost:4000/