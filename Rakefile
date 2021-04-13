namespace :hide do
  desc "create JSON for website"
  task :json, :collection do |t, args|
    #load necessry gems
    require "rubygems"
    require "nokogiri"
    require "json"

    #filter function for readability later
    def filter(string)
      return string.content.gsub(/\s+/, " ")
    end

    #parse function to read each TEI doc
    def parse(filenames, collection)
      #empty file array
      files = []
      #iterate over each filename
      filenames.each { |filename|
        #open document, parse with nokogiri
        @doc = File.open(filename) { |f| Nokogiri::XML(f) }
        #create empty file object
        file = {}
        #get relevant metadatafields
        file["title"] = filter(@doc.xpath("//tei:title", "tei" => "http://www.tei-c.org/ns/1.0")[0])
        file["author"] = filter(@doc.at_css("author"))
        file["pub"] = filter(@doc.at_css("publisher"))
        file["date"] = @doc.at_css("date").attr("when")
        file["text"] = filter(@doc.at_css("body"))
        file["filename"] = filename
        #generate link for jekyllHIDE
        file["link"] = "#{filename}".gsub("TEI/", "").gsub(".xml", "")
        #append file info to large array of files
        files << file
      }
      return files
    end

    #generate a collection directory if one doesnt exist
    if File.directory?("_#{args[:collection]}") == false
      Dir.mkdir "_#{args[:collection]}"
    end
    #get all files from TEI directory
    filenames = Dir.glob("TEI/#{args[:collection]}/*.xml")
    #write out all file metadata as json in data folder
    File.write("_data/meta.json", parse(filenames, args[:collection]).to_json)
  end

  desc "generate pages in collection folder"
  task :pages, :collection do |t, args|
    #load necessry gems
    require "rubygems"
    require "nokogiri"
    #get filenames from TEI dir
    filenames = Dir.glob("TEI/#{args[:collection]}/*.xml")
    #iterate over filenames
    filenames.each { |filename|
      #open document, parse with nokogiri
      @doc = File.open(filename) { |f| Nokogiri::XML(f) }
      #get relevant metadatafields
      title = @doc.xpath("//tei:titleStmt/tei:title/text()", "tei" => "http://www.tei-c.org/ns/1.0")[0]
      #get just the token of filename
      token = filename.gsub("TEI/", "").gsub(".xml", "")
      # get the date of the text
      pubDate = @doc.xpath("//tei:imprint/tei:date/@when", "tei" => "http://www.tei-c.org/ns/1.0")[0]
      #generate yaml frontmatter with token filename
      frontmatter = "---\nlayout: page\ntitle: #{title}\npubDate: #{pubDate}\nfilename: #{token}\n---"
      #write out info into markdown files inside collection directory
      File.write("_#{token}.md", frontmatter)
    }
  end
end
