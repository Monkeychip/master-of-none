import Controller from '@ember/controller';

export default Controller.extend({
  updatedTotal: 0, // tracked

  actions: {
    increment(e) {
      // update total
      if(e.keyCode === 13){

        // 1. fetch old protein amount from Firebase
        const oldProteinCount = this.store.findRecord('protein', 1)
          .then( returnedValue => {
            // 2. add new amount to old total
            let updatedTotal = returnedValue.proteinTotal + Number(e.target.value)
            // 3. set updatedTotal over old record
            returnedValue.set('proteinTotal', updatedTotal);
            // 4. save 
            returnedValue.save()
              .then(() => {
                // 5. display new total on page
                console.log("hit then")
                this.set('updatedTotal', updatedTotal)
              })
          });
        
        
        
      }
    }
  }
});
