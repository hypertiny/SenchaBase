Rails.application.routes.draw do

  mount SenchaBase::Engine => "/sencha_base"

  root :to => 'development#show'
end
