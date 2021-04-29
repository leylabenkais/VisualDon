Convertir données JSON
==
Pour cet exerice, j'ai utilisé les données suivantes : 
http://www.uvek-gis.admin.ch/BFE/ogd/52/Solarenergiepotenziale_Gemeinden_Daecher_und_Fassaden.json

### Marche à suivre #
1. Créer un fichier preparer.js
2. Charger les données  
`const data = require('./Solarenergiepotenziale_Gemeinden_Daecher_und_Fassaden.json')`
3. Créer une constante qui determinera les données à récupérer qui nous intéresse  
`const cantonZurich = d => d.Canton === "Zürich" && d.Scenario1_RoofsOnly_PotentialSolarElectricity_GWh < '40'`
4. Créer un filtre qui affiche que les données qui nous intéressent, selon la commune    
`const resultat = data  
  .filter(cantonZurich)  
  .map(d => ({ nom: d.MunicipalityName, score: d.Scenario1_RoofsOnly_PotentialSolarElectricity_GWh }))  
  .sort((a, b) => a.score > b.score ? -1 : 1)`
