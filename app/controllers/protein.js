import Controller from "@ember/controller";
import moment from "moment";

export default Controller.extend({
  init: function() {
    this._super();
    let today = moment().format("MMDDYYYY");
    let daysArray = [];

    // find today's protein count
    this.store
      .findRecord("protein", today)
      .then(returnedValue => {
        // Set Protein total in template not in database
        this.set("proteinTotal", returnedValue.proteinTotal);
      })
      .catch(error => {
        // clear local storage
        this.store.unloadAll();
        // create record
        let newRecord = this.store.createRecord("protein", {
          id: today,
          proteinTotal: 0
        });
        newRecord.save();
        this.set("proteinTotal", 0);
      });

    // find average protein Count
    this.store
      .query("protein", {
        limit: 7
      })
      .then(value => {
        value.forEach(function(v) {
          console.log(v.get("proteinTotal"), "keep tabs on this");
          daysArray.push(v.get("proteinTotal"));
        });
      })
      .then(() => {
        let sum = daysArray.reduce((a, c) => {
          return a + c;
        }, 0);
        this.set("proteinAvg", parseInt(sum / 7, 0));
      });
  },

  actions: {
    increment(e) {
      let today = moment().format("MMDDYYYY");
      // update total
      if (e.keyCode === 13) {
        // 1. fetch old protein amount from Firebase
        this.store
          .findRecord("protein", today)
          .then(returnedValue => {
            // 2. add new amount to old total
            let updatedTotal =
              returnedValue.proteinTotal + Number(e.target.value);
            // 3. set updatedTotal over old record in Firebase
            returnedValue.set("proteinTotal", updatedTotal);
            // 4. save
            returnedValue.save();

            return updatedTotal;
          })
          .then(updatedTotal => {
            console.log(updatedTotal);
            // 5. display new total on page
            this.set("proteinTotal", updatedTotal);

            // 6. clear value in protein container
            e.target.value = "";
          })
          .catch(error => {
            console.log(error, "error");
          });
      }
    }
  }
});
