import { afterEach, describe, expect, it, vi } from 'vitest'

import { absoluteUrl } from '../../src/utils/absoluteUrl'

describe('absoluteUrl', function () {
  afterEach(function () {
    vi.unstubAllGlobals()
  })

  it('returns the URL unchanged when it is already absolute', function () {
    const url = absoluteUrl('https://example.com/fews/wms')
    expect(url.toString()).toBe('https://example.com/fews/wms')
  })

  it('resolves a relative URL against document.baseURI', function () {
    vi.stubGlobal('document', {
      baseURI: 'https://example.com/fews/',
    })

    const url = absoluteUrl('wms')
    expect(url.toString()).toBe('https://example.com/fews/wms')
  })

  it('resolves a root-relative URL against document.baseURI', function () {
    vi.stubGlobal('document', {
      baseURI: 'https://example.com/fews/',
    })

    const url = absoluteUrl('/wms')
    expect(url.toString()).toBe('https://example.com/wms')
  })
})
