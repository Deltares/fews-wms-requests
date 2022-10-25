import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import expectedGetCapabilities from '../unit/mock/getCapabilities.json'
import {WMSProvider} from "../../src/wmsProvider";
import {GetCapabilitiesFilter} from "../../src";


describe("test", function () {

    afterAll(function () {
        fetchMock.restore();
    });

    it("test", async function () {
        fetchMock.get("https://rwsos-dataservices-ont.avi.deltares.nl/iwp/test/FewsWebServices/wms?request=GetCapabilities&format=application%2Fjson", {
            status: 200,
            body: JSON.stringify(expectedGetCapabilities)
        });
        const provider = new WMSProvider("https://rwsos-dataservices-ont.avi.deltares.nl/iwp/test/FewsWebServices/wms");
        const filter = {} as GetCapabilitiesFilter;
        const res = await provider.getCapabilities(filter);
        expect(res.layers.length).toBeGreaterThan(0);
    });

});
