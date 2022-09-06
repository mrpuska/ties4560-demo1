const express = require('express');
const cors = require('cors');
const CountryInfoService = require('./country-info-service');
const IpLocationService = require('./ip-location-service')
const app = express()
const router = express.Router();
const port = 3000

const isTest = false

const ipLocationService = new IpLocationService(isTest);
const countryInfoService = new CountryInfoService();

router.get('/lookup/:ip', async (req, res, next) => {
  try {
    if (!validateIPaddress(req.params.ip))
      return invalidRequest(res, 'Invalid IP address')
    let result = await ipLocationService.getIpLocation(req.params.ip);

    return res.send(result);
  } catch (err) {
    return next(err);
  }
})

router.get('/country/:countryCode', async (req, res, next) => {
  try {
    if (!req.params.countryCode)
      return res.status(400).send()
    let result = await countryInfoService.getCountryInfo(req.params.countryCode.toUpperCase())
    return res.send(result);
  } catch (err) {
    next(err);
  }
})

router.get('/describe', async (req, res, next) => {
  try {
    let result = await ipLocationService.describe();
    await res.send(result);
  } catch (err) {
    await next(err);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.use(cors());

app.use('/api/', router);

function invalidRequest(res, errorString){
  return res.status(400).send(JSON.stringify({error: errorString}))
}

function validateIPaddress(ipaddress) {  
  return (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
} 