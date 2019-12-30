import { isBlank } from '@ember/utils';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import Component from '@ember/component';
// need for access to the store
import { inject as service } from '@ember/service';

export default Component.extend({
  count : 0,
  store: service(),
  actions: {
    increment(e) {
      if (e.keyCode === 13 && !isBlank(e.target.value)){
          this.store.findRecord('protein', 2)
            .then(function(totalProtein){
              totalProtein.set('proteinTotal', e.target.value);
              totalProtein.save();
              e.target.value = '';
            })
            // this catch doesn't work with the store, unsure why
            .catch(function(){             
              this.store.createRecord('protein', {
                id: 2,
                proteinTotal: e.target.value
              })
              .save()
              .then(function(){
                e.target.value = '';
              })
            })
            this.count = this.count + Number(e.target.value)
        }
    }
  }
});