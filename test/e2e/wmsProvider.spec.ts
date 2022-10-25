import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import {WMSProvider} from "../../src/wmsProvider";
import {GetCapabilitiesFilter} from "../../src";

describe("pi webservice provider", function () {
    it("example", async function () {
        const provider = new WMSProvider("https://rwsos-dataservices-ont.avi.deltares.nl/iwp/test/FewsWebServices/wms");
        const filter = {} as GetCapabilitiesFilter;
        const res = await provider.getCapabilities(filter);
        expect(res.layers.length).toBeGreaterThan(0);
    })

})