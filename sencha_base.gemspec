$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "sencha_base/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "sencha_base"
  s.version     = SenchaBase::VERSION
  s.authors     = ["Hypertiny"]
  s.email       = ["monkeybaby@hypertiny.com"]
  s.homepage    = "http://github.com/hypertiny/SenchaBase"
  s.summary     = "Common resources for Sencha apps."
  s.description = "A Rails Engine for resources common to multiple Sencha apps."

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 3.2"
  s.add_development_dependency 'bootstrap-sass', '~> 2.3.1.0'
  s.add_development_dependency "coffee-rails", "~> 3.2.1"
  s.add_development_dependency 'compass-rails'
  s.add_development_dependency 'jquery-rails', '~> 3.1.5'
  s.add_development_dependency "sass-rails", "~> 3.2.5"
  s.add_development_dependency "uglifier", ">= 1.0.3"
end
