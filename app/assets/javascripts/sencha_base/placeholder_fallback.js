// Placeholder fallback for browsers that don't support it.
//
// Instructions:
// 1. Require sencha_base/placeholder_fallback before any other on submit events
// are binded, so the placeholder attribute is reset and not posted as the field
// value.
//
// 2. Add 'placeholder' class to elements with placeholders.
//
// Thanks to UniqueMethod.com

Ext.onReady(function() {

  // check placeholder browser support
  if(!('placeholder' in document.createElement("input")))
  {
    // set placeholder values
    Ext.select("*[placeholder]").each(function() {
      field = Ext.get(this);
      if(field.getValue() == '') {
        field.set({value: field.getAttribute('placeholder')});
      }
    });

    // focus and blur of placeholders
    Ext.select("*[placeholder]").on('focus', function() {
      field = Ext.get(this);
      if(field.getValue() == field.getAttribute('placeholder')) {
        field.set({value: ''});
        field.removeClass('placeholder');
      }
    }).on('blur', function() {
      field = Ext.get(this);
      if(field.getValue() == '' || field.getValue() == field.getAttribute('placeholder')) {
        field.set({value: field.getAttribute('placeholder')});
        field.addClass('placeholder');
      }
    });

    // remove placeholders on submit
    Ext.select("form").on('submit', function() {
      Ext.get(this).select('*[placeholder]').each(function()
      {
        field = Ext.get(this);
        if(field.getValue() == field.getAttribute('placeholder')) {
          field.set({value: ''});
        }
      });
      return false;
    });
  }
});
