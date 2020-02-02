import Component from "@ember/component";
import { select } from "d3-selection";
import { scaleLinear, scaleBand } from "d3-scale";

export default Component.extend({
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  data: [], // prevent map error if no data

  didInsertElement() {
    let proteinTotalArray = this.get("data");

    let yScale = scaleLinear()
      .domain([0, Math.max(...proteinTotalArray)])
      .range([0, 150]); // min and max of set

    let xScale = scaleBand()
      .domain(this.get("data").map((item, index) => item.index))
      .range([0, 310]) // min and max of set
      .paddingInner(0.12);

    let svg = select(this.$("svg")[0]);

    svg
      .selectAll("rect")
      .data(proteinTotalArray)
      .enter()
      .append("rect")
      .attr("width", xScale.bandwidth())
      .attr("height", data => yScale(data))
      .attr("x", (data, index) => xScale(data.index))
      .attr("y", data => 150 - yScale(data));
  }
});
