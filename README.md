# JekyllHIDE
A jekyll static site template that is a Humanities Interface for Distributed Editions. It takes collections of TEI files  and transforms and distributes them into individual custom-styled digital editions.

## Dependencies
JekyllHIDE runs on Jekyll so you need to have Ruby as well as a ruby manager such as RVM or rbenv installed also. Check the [Ruby docs](https://www.ruby-lang.org/en/documentation/installation/) for instructions on how to install Ruby on your OS and a list of all Ruby managers. You will also need to have the Ruby gems jekyll and bundler installed in order to run any of the setup commands, you can do this by running `gem install jekyll bundler` inside your JekyllHIDE directory. 

## Getting Started
- Place all your TEI files into `/collection`

- run `bundle install` in the JekyllHIDE root directory to install all necessary gems

- run `rake pilot:json[YOUR-COLLECTION-NAME]` to generate a json representation of your collection for searching and TEI transformation as well as create a jekyll collection folder for you

- run `rake pilot:pages[YOUR-COLLECTION-NAME]` to generate markdown files inside that jekyll collection folder to populate the website

- run `bundle exec jekyll serve` and your collection will be running on localhost:4000/