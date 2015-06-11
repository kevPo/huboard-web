import Ember from 'ember';

var IndexController = Ember.Controller.extend({
  needs: ["application"],

  qps: Ember.inject.service("query-params"),
  queryParams: [{"qps.filterParams": "sort"}],
  applyUrlFilters: function(){
    this.get("qps").applyFilterParams();
  }.observes("qps.filterParams").on("init"),

  filters: Ember.inject.service(),
  filtersActive: Ember.computed.alias("filters.filterGroups.active"),

  isSidebarOpen: Ember.computed.alias("controllers.application.isSidebarOpen"),
  board_columns: function(){
     return this.get("model.columns");
  }.property("model.columns"),
  isCollaborator: function(){
    return App.get("repo.is_collaborator");
  }.property('App.repo.is_collaborator'),
  forceRedraw: 0
});

export default IndexController;
