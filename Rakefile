namespace :pilot do
  desc "create JSON for website"
  task :json do
    require "rubygems"
    require "nokogiri"
    require "json"

    def filter(string)
      return string.content.gsub(/\s+/, " ")
    end

    def parse(filenames)
      files = []
      filenames.each { |filename|
        @doc = File.open(filename) { |f| Nokogiri::XML(f) }
        file = {}
        file["title"] = filter(@doc.xpath("//tei:title", "tei" => "http://www.tei-c.org/ns/1.0")[0])
        file["author"] = filter(@doc.at_css("author"))
        file["pub"] = filter(@doc.at_css("publisher"))
        file["date"] = filter(@doc.at_css("date"))
        file["text"] = filter(@doc.at_css("body"))
        file["filename"] = filename
        files << file
      }
      return files
    end

    filenames = Dir.glob("collection/*.xml")
    File.write("_data/meta.json", { "files" => parse(filenames) }.to_json)
  end

  desc "generate pages in collection folder"
  task :pages, :collection do |t, args|
    puts args[:collection]
    filenames = Dir.glob("collection/*.xml")
    filenames.each { |filename|
      token = filename.gsub("collection/", "").gsub(".xml", "")
      frontmatter = "---\nlayout: page\nfilename: #{token}\n---"
      File.write("_#{args[:collection]}/#{token}.md", frontmatter)
    }
  end
end
