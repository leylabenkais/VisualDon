const xlsx = require('xlsx') //convertit de xlsx à JSON

const file = xlsx.readFile('peinaussteiger.xlsx')
const json = xlsx.utils.sheet_to_json(file.Sheets['data'])

const vaud = d => d.Kanton === "VD" && d.DTV_2018 > 10000;
const resultat = json.filter(vaud)
    .map(d => ({nom : d.Bahnhof_Haltestelle, voyageurs: d.DTV_2018}))
    .sort((a, b) => a.voyageurs > b.voyageurs ? -1 : 1);

    console.log(JSON.stringify(resultat))