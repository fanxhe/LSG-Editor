require 'livingstyleguide'
require 'sinatra'

get '/' do
  doc = LivingStyleGuide::Document.new do
    ERB.new(File.read("#{File.dirname(__FILE__)}/templates/welcome_editor.lsg.erb")).result
  end
  erb :index, :locals => { :doc => doc }
end

post '/lsg' do
  doc = LivingStyleGuide::Document.new do
    params[:code_lsg]
  end
  doc.render
end
