import Ember from 'ember';

var  HbFlashComponent = Ember.Component.extend({
  classNames: ['message'],
  classNameBindings: ['flash.id'],

  click: function(){
    var flash = this.get('flash');
    flash._setTimer("timer", "destroyMessage", 0);
  },

  setMessage: function(){
    var message = this.get('flash.message');
    this.set('message', message);
  }.on('init'),

  didInsertElement: function(){
    this.$().css("margin-bottom", -38);
    this.$().animate({
      'top': '+=38px',
      'margin-bottom': '+=42px'
    }, 400);
  }
});

export default HbFlashComponent;
