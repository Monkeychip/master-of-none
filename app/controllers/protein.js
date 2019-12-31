import Controller from '@ember/controller';
import moment from 'moment';

export default Controller.extend({

  // on init, check if you need to clear the protein date
  init: function() {
    this._super();

    // Checking if need to wipe out date
    // TODO: change the ID to date (day month year) dynamically so you keep track of records 
    // AND that's how you change or wipe out the record.
    this.store.findRecord('protein', 1)
    .then( returnedValue => {
      this.set('updatedTotal', returnedValue.proteinTotal)
      return moment(returnedValue.timestamp).format("DD");
    })
    .then( returnedDate => {
      let rightNow = moment().format("DD")
      if(returnedDate !== rightNow) {
        console.log("here")
        this.store.findRecord('protein', 1)
        .then( returnedValue => {
          returnedValue.set('proteinTotal', 0);
          returnedValue.set('timestamp', new Date());
          returnedValue.save();
        })
      }
    })
    
  },

  actions: {
    increment(e) {
      let str = new Date().toISOString()
      let date = moment(str).format("YYYY-MM-DD h:mm:ss")
      // update total
      if(e.keyCode === 13){
        // 1. fetch old protein amount from Firebase
        this.store.findRecord('protein', 1)
          .then( returnedValue => {
            // 2. add new amount to old total
            let updatedTotal = returnedValue.proteinTotal + Number(e.target.value)
            // 3. set updatedTotal over old record
            returnedValue.set('proteinTotal', updatedTotal);
            returnedValue.set('timestamp', new Date());
            // 4. save 
            returnedValue.save()
              .then(() => {
                // 5. display new total on page
                this.set('updatedTotal', updatedTotal)
                // 6. clear value in protein container
                e.target.value = '';
              })
          });
      }
    }
  }
});
