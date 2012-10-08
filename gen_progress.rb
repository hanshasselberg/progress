require 'rubygems'
require 'rmagick'
include Magick

gif = ImageList.new

101.times do |i|
  img = Image.read("caption:#{i}%") do
    self.size = "100x"
    self.pointsize = 20
    self.font = "Tahoma"
    self.gravity = Magick::CenterGravity
  end
  gif << img[0]
end

gif.write("progress.gif")
