import Controller from "@ember/controller";
import Moment from "moment";
import { extendMoment } from "moment-range";
// import { hash } from "rsvp"; ARG TODO revisit

export default Controller.extend({
  init: function(params) {
    const moment = extendMoment(Moment);
    this._super();
    let today = moment().format("MMDDYYYY");
    let proteinAverageArray = [];

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

    // set hash so you can use "query"
    let hash = {};
    let uid = params.user;
    if (uid) {
      hash.user = uid;
    }
    // find average protein Count
    this.store
      .query("protein", hash)
      .then(value => {
        // ARG TODO: there's got to be a way to clean this up
        let range = moment.range(moment().subtract(6, "day"), moment());
        let arrayRange = Array.from(range.by("day"));
        let a = []; // array of only last 7 days

        arrayRange.forEach(v => a.push(v.format("MMDDYYYY")));
        let filteredArray = value.filter(element =>
          a.includes(element.get("id"))
        );
        return filteredArray;
      })
      .then(value => {
        value.forEach(function(v) {
          proteinAverageArray.push(parseInt(v.get("proteinTotal")));
        });
      })
      .then(() => {
        let sum = proteinAverageArray.reduce((a, c) => {
          return a + c;
        }, 0);
        this.set("proteinAvg", parseInt(sum / 7, 0));
      });

    // saving array in store so can use for d3 graph
    // let meep = [
    //   {
    //     id: "02022020",
    //     proteinTotal: 40
    //   },
    //   {
    //     id: "02012020",
    //     proteinTotal: 30
    //   },
    //   {
    //     id: "01312020",
    //     proteinTotal: 32
    //   },
    //   {
    //     id: "01302020",
    //     proteinTotal: 30
    //   },
    //   {
    //     id: "01292020",
    //     proteinTotal: 40
    //   },
    //   {
    //     id: "0128020",
    //     proteinTotal: 130
    //   },
    //   {
    //     id: "01272020",
    //     proteinTotal: 30
    //   }
    // ];
    //
    let meep = [1, 2, 3, 4, 5, 6, 7];
    // Read more about Enurable Arrays and how to map over in d3, problem is the proteinAvreageArray is an ember array
    this.set("testData", meep);
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
