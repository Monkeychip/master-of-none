import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
// need for access to the store
import { inject as service } from '@ember/service';


export default class Counter extends Component {
  @tracked count = 0; 
  @service store; // vs store: service()
  @action
  increment(value) {
    this.count = this.count + Number(value)
    let updatedTotalProtein = this.count;
    this.store.findRecord('protein', 3).then(function(value) {
      value.set('proteinTotal', Number(updatedTotalProtein));
      record.save();
    });
    
// TODO - do the follow create record if none exist.
// TODO - on refresh set the default value from local storage
// TODO - once submit, remove the input value.
    // let protein = this.store.createRecord('protein', {
    //   id: 3,
    //   proteinTotal: this.count,
    // })
    // protein.save()
  }

}