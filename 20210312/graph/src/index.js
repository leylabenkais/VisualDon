import {
  axisLeft,
  select,
  scaleLinear,
  max,
} from 'd3'

const DATA = [
  { nom: 'Lausanne', population: 138905 },
  { nom: 'Yverdon-les-Bains', population: 30143 },
  { nom: 'Montreux', population: 26574 },
  { nom: 'Renens', population: 21036 },
  { nom: 'Nyon', population: 20533 },
  { nom: 'Vevey', population: 19827 },
]

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
  .domain([0, max(DATA, d => d.population)])
  .range([HEIGHT - MARGIN_BOTTOM, 0])


const g = svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT}, 0)`)

g.selectAll('rect')
  .data(DATA)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * BAR_WIDTH)
  .attr('width', BAR_WIDTH - MARGIN)
  .attr('y', d => yScale(d.population))
  .attr('height', d => HEIGHT - MARGIN_BOTTOM - yScale(d.population))
  .attr('fill', 'steelblue')

g.selectAll('path')
  .data(pieData)
  .enter()
  .append('path')
  .attr('d', arcCreator)
  .attr('fill', color)

// un texte pour chaque tranche
g.selectAll('text')
  .data(pieData)
  .enter()
  .append('text')
  // .centroid permet de trouver le centre de la tranche
  .attr('transform', d => `translate(${arcCreator.centroid(d)})`)
  .attr('text-anchor', 'middle')
  .text(d => d.data.nom)

const axisY = axisLeft().scale(yScale)
  .tickFormat(d => `${d / 1000}k`)
  .ticks(5)

svg.append('g')
  .attr('transform', `translate(${HEIGHT / 2}, ${HEIGHT / 2})`)
  .call(axisY)

// la légende
const legend = svg.append('g')
  .attr('transform', `translate(${HEIGHT - 10})`)

// les carrés de couleur3.line()
legend.selectAll('rect')
  .data(pieData)
  .enter()
  .append('rect')
  .attr('y', (d, i) => i * RECT_WIDTH)
  .attr('width', RECT_WIDTH)
  .attr('height', RECT_WIDTH)
  .attr('fill', color)

// les noms de fruits
legend.selectAll('text')
  .data(pieData)
  .enter()
  .append('text')
  .attr('x', RECT_WIDTH * 1.5)
  .attr('y', (d, i) => i * RECT_WIDTH + RECT_WIDTH * 0.75)
  .attr('width', RECT_WIDTH)
  .attr('height', RECT_WIDTH)
  .text(d => d.data.nom)

