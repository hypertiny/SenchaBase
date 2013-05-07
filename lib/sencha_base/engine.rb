module SenchaBase
  class Engine < ::Rails::Engine
    isolate_namespace SenchaBase

    config.to_prepare do
      ApplicationController.helper(SenchaBase::ApplicationHelper)
    end
  end
end
