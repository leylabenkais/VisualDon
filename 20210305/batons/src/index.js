import {
  axisLeft,
  select,
  scaleLinear,
  max,
} from 'd3'

const DATA = [{"nom":"Zürich","score":865.54},{"nom":"Winterthur","score":356.4},{"nom":"Uster","score":121.41},{"nom":"Kloten","score":113.84},{"nom":"Wädenswil","score":96.35},{"nom":"Wetzikon (ZH)","score":94.35},{"nom":"Dübendorf","score":91.84},{"nom":"Regensdorf","score":87.36},{"nom":"Dietikon","score":84.98},{"nom":"Hinwil","score":84.82},{"nom":"Volketswil","score":81.94},{"nom":"Illnau-Effretikon","score":73.85},{"nom":"Horgen","score":72.49},{"nom":"Bülach","score":70.63},{"nom":"Schlieren","score":66.06},{"nom":"Wallisellen","score":61.57}]


const WIDTH = 1000
const HEIGHT = 500
const MARGIN = 5
const MARGIN_LEFT = 50
const MARGIN_BOTTOM = 50
const BAR_WIDTH = (WIDTH - MARGIN_LEFT) / DATA.length

const svg = select('body')
  .append('svg')
  .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)

const yScale = scaleLinear()
  .domain([0, max(DATA, d => d.score)])
  .range([HEIGHT - MARGIN_BOTTOM, 0])


const g = svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT}, 0)`)

g.selectAll('rect')
  .data(DATA)
  .enter()
  .append('rect')
  .attr('x', (d, i) =>  i * BAR_WIDTH)
  .attr('width', BAR_WIDTH - MARGIN)
  .attr('y', d => yScale(d.score))
  .attr('height', d => HEIGHT - MARGIN_BOTTOM - yScale(d.score))
  .attr('fill', 'steelblue')

g.selectAll('text')
  .data(DATA)
  .enter()
  .append('text')
  .text(d => d.nom)
  .attr('x', (d, i) =>  i * BAR_WIDTH + BAR_WIDTH / 2)
  .attr('y', HEIGHT - MARGIN_BOTTOM / 2)
  .attr('text-anchor', 'middle')

const axisY = axisLeft().scale(yScale)
  .tickFormat(d => `${d / 1000}k`)
  .ticks(5)

svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT - 3})`)
  .call(axisY)
