require 'livingstyleguide'
require 'sinatra'

get '/' do 
  erb :index
end

post '/lsg' do
  doc = LivingStyleGuide::Document.new do
    params[:code_lsg]
  end
  doc.render
end