import { describe, expect, it } from 'vitest'

import { WMSProvider } from "../../src/wmsProvider"
import { GetCapabilitiesFilter, GetLegendGraphicFilter } from "../../src"

const baseUrl = import.meta.env.VITE_DOCKER_URL || "";

describe("wms webservice provider", function () {
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
        filter.layers = "saws1"
        const res = await provider.getLegendGraphic(filter);
        expect(res.unit).toBeUndefined();
        expect(res.legend[0].lowerValue).toEqual(0);
        expect(res.legend[0].color).toEqual('#ffffff');
        expect(res.legend[1].color.toLowerCase()).toEqual('#99f3ff');
        expect(res.legend[1].colorSmoothing).toBeTruthy();
        expect(res.legend[1].label).toEqual('>= 1');
        expect(res.legend[1].lowerValue).toEqual(1.0)
        expect(res.legend.length).toEqual(11);
    })
})
