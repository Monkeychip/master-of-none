import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
  proteinTotal: attr('number'),
  timestamp: attr('date', { defaultValue() { return new Date()}}),
});
