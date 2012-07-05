SenchaBase
----------

A Rails Engine for resources common to multiple Sencha apps.

To include this engine in your Rails app add the following to your Gemfile. Note you must replace the ref parameter with the latest Git commit ref for this engine.

    gem 'semcha_base', :git => 'git@github.com:hypertiny/SenchaBase.git', :ref => 'xxxxxxxx'

Any resources you want share among multiple apps should be added to this engine as you would add them to any Rails app.For example add stylesheets to `app/assets/sencha_base/stylesheets/..`. These stylesheets will then be accessible in any app that includes this engine at `/assets/sencha_base/..`.

Development process for this engine
-----------------------------------

1. Make changes in this engine, rebuild the engine with `rake install`, commit, push and take note of the new Git ref.
2. Update the Git ref in the Gemfile of each app using this engine and run `bundle`.
3. Commit the changes in the host app.
4. If more changes are needed in the engine go back to step 1.

Note to test changes to this engine locally before committing them you should change your Gemfile *temporarily* to reference the local version of this engine e.g.

    gem 'sencha_base'

