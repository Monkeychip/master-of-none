import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class Counter extends Component {
  @tracked count = 0;  
  @action
  increment(value) {
    this.count = this.count + Number(value);
  }

}