# SenchaBase

A Rails Engine for resources common to multiple Sencha apps.

To include this engine in your Rails app add the following to your Gemfile. Note you must replace the ref parameter with the latest Git commit ref for this engine. 

    gem 'sencha_base', :git => 'git://github.com/hypertiny/SenchaBase.git', :ref => 'xxxxxxxx'

Any resources you want share among multiple apps should be added to this engine as you would add them to any Rails app. For example add stylesheets to `app/assets/sencha_base/stylesheets/..`. These stylesheets will then be accessible in any app that includes this engine at `/assets/sencha_base/..`.

To include Sencha Base CSS in your app, require the Sencha Base manifest file in the app CSS manifest file.

E.g. *= require sencha_base/application

### Sass partials can be into to the app specific stylesheets.

E.g. @import 'sencha_base/variables';

### Form error messages and alerts.

Starting to get these consistent.

The following styles should be applied to element wrapping the error message, ideally, just a <ul> or <p>. A <div> is fine, but no need for nested elements.
  
    <ul class="alert alert-error"><li>You must enter an email address</li></ul>
    <p> class="alert alert-info">Please choose a username</p>
    <div class="alert alert-success">Success!</div>
    
Classes are based on [Twitter Bootstraps alerts] (http://twitter.github.com/bootstrap/components.html#alerts).

## Workflow when working from remote repo

  1. Make change to a shared resource in Sencha Base
  2. Commit change and push
  3. Copy commit ref
  4. Update commit ref in Gemfile of all apps
  5. Bundle apps
  6. Restart the server if using Pow: touch tmp/restart.txt

## Workflow when working locally

  1. Remove path from Gemfile.
  2. Make change to a shared resource in Sencha Base
  3. Run 'rake install' in terminal
  
When finished working locally, be sure to commit Sencha Base changes, update apps with the GitHub commit ref, bundle apps and restart server.