import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import {WMSProvider} from "../../src/wmsProvider";
import {GetCapabilitiesFilter, GetLegendGraphicFilter} from "../../src";

const baseUrl = process.env.TEST_URL || "";

describe("pi webservice provider", function () {
    it("get capabilities", async function () {
        const provider = new WMSProvider(baseUrl);
        const filter = {} as GetCapabilitiesFilter;
        const res = await provider.getCapabilities(filter);
        expect(res.layers.length).toBeGreaterThan(0);
    })
    it("get legend graphics json", async function () {
        const provider = new WMSProvider(baseUrl );
        const filter = {} as GetLegendGraphicFilter;
        filter.format = "application/json"
        filter.layers = "Neerslag Synop"
        const res = await provider.getLegendGraphic(filter);
        expect(res.unit).toEqual("mm");
        expect(res.legend[0].lowerValue).toEqual(0);
        expect(res.legend[0].color).toEqual('#ffffff');
    })
})
