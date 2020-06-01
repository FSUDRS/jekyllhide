require "rubygems"
require "nokogiri"
require "json"
filenames = Dir.glob("collection/*.xml")

def parse(filenames)
  files = []
  filenames.each { |filename|
    @doc = File.open(filename) { |f| Nokogiri::XML(f) }
    file = {}
    file["title"] = @doc.xpath("//tei:title", "tei" => "http://www.tei-c.org/ns/1.0")[0].content
    file["author"] = @doc.at_css("author").content
    file["pub"] = @doc.at_css("publisher").content
    file["date"] = @doc.at_css("date").content.gsub("/\s+/", " ")
    file = file.to_json
    files << file
    puts files
    puts "-----------------"
  }
  return files
end

parse(filenames)
