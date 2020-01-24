
import Route from '@ember/routing/route';
import moment from 'moment';
import { hash } from 'rsvp';

export default Route.extend({

  model() {
    let today = moment().format("MMDDYYYY")
    
    return hash({
      blah: "blah",
      fullRouteModel: this.store.findAll('protein'),
      // proteinForToday: this.store.findRecord('protein', today).then(v => v.proteinTotal),
    })
  }
});

