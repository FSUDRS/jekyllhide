namespace :hide do
  desc "create JSON for website"
  task :json, :collection do |t, args|
    require "rubygems"
    require "nokogiri"
    require "json"

    def filter(string)
      return string.content.gsub(/\s+/, " ")
    end

    def parse(filenames, collection)
      files = []
      filenames.each { |filename|
        @doc = File.open(filename) { |f| Nokogiri::XML(f) }
        file = {}
        file["title"] = filter(@doc.xpath("//tei:title", "tei" => "http://www.tei-c.org/ns/1.0")[0])
        file["author"] = filter(@doc.at_css("author"))
        file["pub"] = filter(@doc.at_css("publisher"))
        file["date"] = @doc.at_css("date").attr("when")
        file["text"] = filter(@doc.at_css("body"))
        file["filename"] = filename
        file["link"] = "#{collection}/#{filename}".gsub("collection/", "").gsub(".xml", "")
        files << file
      }
      return files
    end

    if File.directory?("_#{args[:collection]}") == false
      Dir.mkdir "_#{args[:collection]}"
    end
    filenames = Dir.glob("collection/*.xml")
    File.write("_data/meta.json", parse(filenames, args[:collection]).to_json)
  end

  desc "generate pages in collection folder"
  task :pages, :collection do |t, args|
    filenames = Dir.glob("collection/*.xml")
    filenames.each { |filename|
      token = filename.gsub("collection/", "").gsub(".xml", "")
      frontmatter = "---\nlayout: page\nfilename: #{token}\n---"
      File.write("_#{args[:collection]}/#{token}.md", frontmatter)
    }
  end
end
