# SenchaBase

A Rails Engine for resources common to multiple Sencha apps.

To include this engine in your Rails app add the following to your Gemfile. Note you must replace the ref parameter with the latest Git commit ref for this engine. 

    gem 'sencha_base', :git => 'git://github.com/hypertiny/SenchaBase.git', :ref => 'xxxxxxxx'

Any resources you want share among multiple apps should be added to this engine as you would add them to any Rails app. For example add stylesheets to `app/assets/sencha_base/stylesheets/..`. These stylesheets will then be accessible in any app that includes this engine at `/assets/sencha_base/..`.

To include Sencha Base CSS in your app, require the Sencha Base manifest file in the app CSS manifest file.

E.g. *= require sencha_base/application

### Sass partials can be into to the app specific stylesheets.

E.g. @import 'sencha_base/variables';

## Form alerts

Form alerts appear within, or just above a form. Not in the header like a flash notice. [See example] (http://skit.ch/nipg)

The following styles should be applied to elements wrapping the error message, ideally, just a ``<ul>`` or ``<p>``. A ``<div>`` is fine, but no need for nested elements.
  
    <ul class="alert alert-error"><li>You must enter an email address</li></ul>
    <p> class="alert alert-info">Please choose a username</p>
    <div class="alert alert-success">Success!</div>
    
Classes are based on [Twitter Bootstraps alerts] (http://twitter.github.com/bootstrap/components.html#alerts).

## Flash notices

Flash notices appear in the header and fade out (css animation) after 3 seconds. [See example] (http://skit.ch/nip8)

The following styles should be applied to the element wrapping the flash notice, ideally a ``<div>``. The ``<div>`` allows content of undeclared width to be centred. A ``<p>`` is usually nested containing the notice content and the styles are applied to this element.
  
    <div class="flash_notice">
      <p class="notice">Success! I'm green.</p>
    </div>
    <div class="flash_notice">
      <p class="alert error or warning">There was a problem! I'm red</p>
    </div>
    
Note, .alert, .error and .warning are the same and will be cleared up; .error is the class name to be adopted consistently.

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