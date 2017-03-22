const getJSON = require('./getData');
const getAverage = require('./average');

const company = process.argv[2];

if (!company) {
  console.log(`Please enter a company symbol.\nExample: 'node main.js AAPL'`);
  process.exit()
}

const api = `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"${company}","Type":"price","Params":["c"]}]}`;


getJSON(api)
.then(res => res.Elements[0].DataSeries.close)
.then(({ values }) => getAverage(values))
.then(average => console.log(` The average price of ${company}'s stock is $${average.toFixed(2)}.`))
.catch(err => console.log('Error', err.message));
