import Ember from 'ember';
import Model from '../model';
import Board from './board';
import Issue from './issue';
import ajax from 'ic-ajax';

var PromiseObject = Ember.Object.extend(Ember.PromiseProxyMixin);
var Repo = Model.extend({
  parent: null,
  repos: Ember.computed('links.[]', function(){
    var repos = [this].concat(this.get('links'));
    return repos;
  }),
  isCollaborator: Ember.computed('data.repo.permissions.{admin,push}', function(){
    return this.get('data.repo.permissions.admin') || this.get('data.repo.permissions.push');
  }),
  isAdmin: Ember.computed.alias('data.repo.permissions.admin'),
  baseUrl: Ember.computed('data.repo.full_name', function () {
    return `/api/v2/${this.get('data.repo.full_name')}`;
  }),
  userUrl :function () {
    return "/" + this.get("data.repo.owner.login");
  }.property("data.repo.owner.login"),
  repoUrl :function () {
    return `${this.get('userUrl')}/${this.get("data.repo.name")}`;
  }.property("data.repo.name",'userUrl'),
  milestonesLength: Ember.computed.alias('data.milestones.length'),
  milestones: Ember.computed('data.milestones', 'data.milestones.length', function(){
  }),
  links: Ember.computed('data.links', function(){
    var self = this, 
    links = this.get('data.links');
    var response = Ember.A();
    links.forEach(function(link){
      var repo = Repo.create({ data: link });
      repo.set('parent', self);
      response.pushObject(repo);
    });
    return response;
  }),
  load: function(){
    var repo = this;
    return this.get('ajax')(`${this.get('baseUrl')}/details`).then(function(details){
      var issues = details.data.issues.map((x) => Issue.create({data: x, repo: repo}));
      repo.set('issues', issues);
      return repo;
    });
  },
  fetchSettings: function(){
    if(this._settings) {return this._settings;}
    return Ember.$.getJSON("/api/" + this.get("data.repo.full_name") + "/settings");
  }
});

export default Repo;
