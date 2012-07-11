SenchaBase
----------

To set up your app to use shared resources
------------------------------------------

Add Gem with Github ref to gem file: gem 'sencha_base', :git => 'git://github.com/hypertiny/SenchaBase.git', :ref => 'xxxxxx'
Add import for sass partials to the main stylesheet file.

E.g. Add
@import 'sencha_base/variables';
@import 'sencha_base/helpers';
to sdd.scss.

Then, include the Sencha Base CSS manifest file in the app CSS manifest file.
E.g.  *= require sencha_base/application, placed above, *= require_self in application.css

A Rails Engine for resources common to multiple Sencha apps.

To include this engine in your Rails app add the following to your Gemfile. Note you must replace the ref parameter with the latest Git commit ref for this engine.

    gem 'sencha_base', :git => 'git://github.com/hypertiny/SenchaBase.git', :ref => 'xxxxxxxx'

Any resources you want share among multiple apps should be added to this engine as you would add them to any Rails app.For example add stylesheets to `app/assets/sencha_base/stylesheets/..`. These stylesheets will then be accessible in any app that includes this engine at `/assets/sencha_base/..`.

Workflow when working from remote repo
--------------------------------------

  1. Make change to a shared resource in Sencha Base
  2. Commit change and push
  3. Copy commit ref
  4. Update commit ref in Gemfile of all apps
  5. Bundle apps
  6. Restart the server if using Pow: touch tmp/restart.txt

Workflow when working locally
--------------------

  1. Remove path from Gemfile.
  2. Make change to a shared resource in Sencha Base
  3. Run 'rake install' in terminal