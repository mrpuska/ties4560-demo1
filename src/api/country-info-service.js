const soap = require('soap')

class CountryInfoService {

    constructor() {
        this.init();
    }

    async init(){
        var url = 'http://webservices.oorsprong.org/websamples.countryinfo/countryinfoservice.wso?WSDL';
        try {
            this.client = await soap.createClientAsync(url, {});
        } catch (err){
            console.log(err)
        }
    }

    async getCountryInfo(countryISOcode){
        let args = {sCountryISOCode: countryISOcode}
        let result =  await this.client.FullCountryInfoAsync(args)
        return result[0].FullCountryInfoResult;
    }

}

module.exports = CountryInfoService;