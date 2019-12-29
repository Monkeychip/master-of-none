import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
// need for access to the store
import { inject as service } from '@ember/service';


export default class Counter extends Component {
  @tracked count = 0; 
  @service store;
  @action
  increment(value) {
    // creaate record in store on action
    let previousRecord = this.store.peekRecord('protein', 1);
    previousRecord ? console.log("true reocrd") : console.log("false no record")
    this.count = this.count + Number(value);
  }

}