require 'livingstyleguide'
require 'sinatra'
require 'haml'

EXAMPLES = %w{ colors fonts markdown code_block javascript hmal}

get '/' do
  doc = LivingStyleGuide::Document.new do
    ERB.new(File.read("#{File.dirname(__FILE__)}/templates/#{EXAMPLES.sample}.lsg.erb")).result
  end
  erb :index, :locals => { :doc => doc }
end

post '/lsg' do
  doc = LivingStyleGuide::Document.new do
    params[:code_lsg]
  end
  doc.render
end