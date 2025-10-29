import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import expectedGetCapabilities from '../unit/mock/getCapabilities.json'
import {WMSProvider} from "../../src/wmsProvider";
import {GetCapabilitiesFilter} from "../../src";


describe("WMS Provider Tests", function () {
    async function transformRequest(request: Request): Promise<Request> {
        const requestInit: RequestInit = {
            // Only some of the properties of RequestInit are used by fetch-mock, such as 'headers'.
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer 123"
            },
        }
        return new Request(request, requestInit)
    }

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
        expect(res.layers[0]?.onlyGrids).toBe(true);
        if (res.layers[0].keywordList && res.layers[0].keywordList.length > 0) {
            expect(res.layers[0].keywordList[0]["parameterId"]).toBe("T.hindcast.mean.global.historicalNat");
        }
        expect(res.layers[0]?.externalForecastTime).toBe("1850-01-16T12:00:00Z");
    });

    it("GetCapabilitiesWithToken", async function () {
        fetchMock.get("https://rwsos-dataservices-ont.avi.deltares.nl/iwp/test/FewsWebServicesSecured/wms?request=GetCapabilities&format=application%2Fjson", {
            status: 401,
            body: ''
        });
        const provider = new WMSProvider("https://rwsos-dataservices-ont.avi.deltares.nl/iwp/test/FewsWebServicesSecured/wms", {transformRequestFn: transformRequest});
        const filter = {} as GetCapabilitiesFilter;
        const res = provider.getCapabilities(filter);
        await expect(res).rejects.toThrow("Fetch Error"); // unauthorized will throw a fetch error
    });

});
