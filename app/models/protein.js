import DS from 'ember-data';
const { Model, attr } = DS;

export default class Protein extends Model {
  @attr('number', { defaultValue: 0}) proteinTotal;
}

// indivdual record of this model might be
// this.store.findRecord('proteinTotal', 1);
// where the id is 1
// id is usually assigned to a record by the server