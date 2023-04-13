import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import expectedGetCapabilities from '../unit/mock/getCapabilities.json'
import {WMSProvider} from "../../src/wmsProvider";
import {GetCapabilitiesFilter} from "../../src";


describe("WMS Provider Tests", function () {

    afterAll(function () {
        fetchMock.restore();
    });

    it("GetCapabilities", async function () {
        fetchMock.get("https://rwsos-dataservices-ont.avi.deltares.nl/iwp/test/FewsWebServices/wms?request=GetCapabilities&format=application%2Fjson", {
            status: 200,
            body: JSON.stringify(expectedGetCapabilities)
        });
        const provider = new WMSProvider("https://rwsos-dataservices-ont.avi.deltares.nl/iwp/test/FewsWebServices/wms");
        const filter = {} as GetCapabilitiesFilter;
        const res = await provider.getCapabilities(filter);
        expect(res.layers.length).toBeGreaterThan(0);
        expect(res.layers[0]?.boundingBox?.maxx).toBe("0.00161697");
        expect(res.layers[0]?.boundingBox?.minx).toBe("-20037508.34278924");
        expect(res.layers[0]?.boundingBox?.maxy).toBe("15028132.47295554");
        expect(res.layers[0]?.boundingBox?.miny).toBe("-0.00071121");
        expect(res.layers[0]?.firstValueTime).toBe("1850-01-16T12:00:00Z");
        expect(res.layers[0]?.lastValueTime).toBe("1850-12-16T12:00:00Z");
        expect(res.layers[0]?.completelyMissing).toBe(false);
        expect(res.layers[0]?.times?.length).toBe(12);
        expect(res.layers[0]?.timesDefault).toBe("1850-12-16T12:00:00Z");
        expect(res.layers[0]?.groupName).toBe("Goddard NASA Monthly Historical Grids");
        expect(res.layers[0]?.name).toBe("giss_e2_h_grid_monthly_historical_nat");
    });

});
