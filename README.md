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

### Example copy

* Email can't be blank
* Current password can't be blank

Note, full stops are not used.

### Markup

The following styles should be applied to elements wrapping the error message, ideally, just a ``<ul>`` or ``<p>``. A ``<div>`` is fine, but no need for nested elements.

    <ul class="alert alert-error"><li>You must enter an email address</li></ul>
    <p> class="alert alert-info">Please choose a username</p>
    <div class="alert alert-success">Success!</div>

Classes are based on [Twitter Bootstraps alerts] (http://twitter.github.com/bootstrap/components.html#alerts).

## Flash notices

Flash notices appear in the header and fade out (css animation) after 3 seconds. [See example] (http://skit.ch/nip8)

### Example copy

* Logged out successfully.
* Logged in successfully.

Note, full stops are used.

### Markup

The following styles should be applied to the element wrapping the flash notice, ideally a ``<div>``. The ``<div>`` allows content of undeclared width to be centred. A ``<p>`` is usually nested containing the notice content and the styles are applied to this element.

    <div class="flash_notice">
      <p class="notice">Success! I'm green.</p>
    </div>
    <div class="flash_notice">
      <p class="alert error or warning">There was a problem! I'm red</p>
    </div>

Note, .alert, .error and .warning are the same and will be cleared up; .error is the class name to be adopted consistently.

## Relative Units

Two helpers are in place to assist with ``px`` to ``em`` conversion.

If an element inherits the ``$base-font-size``, use ``pem()`` to convert pixels to ems. E.g. ``margin-left: 12px`` can become ``margin-left: pem(12px)`` and the 12px will be converted to an em value relative to the ``$base-font-size``

If an element has a font size other than the ``$base-font-size`` set, e.g. a heading, then the ``@include scale()`` helper can be used with the new font size specified. E.g.

    // Base font size inherited
    .p {
      margin: 0 pem(24px);
    }

    h1 {
      @include adjust-font-size-to(22px)

      // This means convert px to em, where 1em = 22px
      @include scale(margin, 0px 12px, 22px)
    }

    See _helpers.scss for more examples.

See [http://mrdanadams.com/2012/pixel-ems-css-conversion-sass-mixin/] (http://mrdanadams.com/2012/pixel-ems-css-conversion-sass-mixin/)

## Workflow

  1. Point Gemfile to local SenchaBase gem by changing

    ``gem 'sencha_base', :git => 'git://github.com/hypertiny/SenchaBase.git', :ref => 'xxxxxxxx'``

    to

    ``gem 'sencha_base', :path => /path/to/local/sencha-base``

    Note! Don't commit a Gemfile when you've pointed it to a local SenchaBase gem.

  2. Run ``bundle``
  3. Make your changes to SenchaBase
  4. Restart the Sencha app you’re working on (e.g. ID, Devs, Market). If using Pow: ``touch tmp/restart.txt``
  5. Repeats steps 3 and 4 until you are ready to commit your SenchaBase changes.
  6. Commit SenchaBase changes and push.
  7. Copy the short commit ref for your latest SenchaBase commit, i.e. first 7 characters.
  8. Update the apps using SenchaBase to use the latest version by pointing them to that latest commit ref by changing:

    ``gem 'sencha_base', :path => /path/to/local/sencha-base``

    to

    ``gem 'sencha_base', :git => 'git://github.com/hypertiny/SenchaBase.git', :ref => 'latest-commit-ref'``

  9. Bundle those apps and commit.
