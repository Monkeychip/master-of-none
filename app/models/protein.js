import DS from "ember-data";
const { Model, attr } = DS;

export default Model.extend({
  // ARG: unsure why I can't use id: attr("string")
  proteinTotal: attr("number")
});
