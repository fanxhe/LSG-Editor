require 'livingstyleguide'
require 'sinatra'

#EXAMPLES = %w{ colors.erb fonts.erb javascript.erb }

get '/' do
  doc = LivingStyleGuide::Document.new do
    ERB.new(File.read("#{File.dirname(__FILE__)}/templates/colors.lsg.erb")).result
  end
  erb :index, :locals => { :doc => doc }
end

post '/lsg' do
  doc = LivingStyleGuide::Document.new do
    params[:code_lsg]
  end
  doc.render
end