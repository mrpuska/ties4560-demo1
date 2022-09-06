const soap = require('soap');

class IpLocationService {

    constructor(isTest) {
        this.init();
        this.isTest = isTest;
    }

    async init(){
        var url = 'https://ws.cdyne.com/ip2geo/ip2geo.asmx?WSDL';
        try {
            this.client = await soap.createClientAsync(url, {});
        } catch (err){
            console.log(err)
        }
    }

    describe(){
        return this.client.describe();
    }

    async getIpLocation(ipAddress) {
        if (this.isTest)
            return this.testData;

        var args = {ipAddress: ipAddress, licenseKey: '0'};
        var res = await this.client.ResolveIPAsync(args);
        return res[0].ResolveIPResult;
    }

    testData = `{"City":"Jyväskylä","StateProvince":"","Country":"Finland","Organization":"","Latitude":0,"Longitude":0,"AreaCode":"","TimeZone":"","HasDaylightSavings":false,"Certainty":0,"RegionName":"","CountryCode":"FI"}`;
}

module.exports = IpLocationService;