import Ember from 'ember';

var HbCommentCount = Ember.Component.extend({
  tagName: 'div',
  classNames: ["comments"],
  classNameBindings: ["noComments:none"],

  noComments: function() {
    return this.get('numberOfComments') === 0;
  }.property('numberOfComments')
});

export default HbCommentCount;
