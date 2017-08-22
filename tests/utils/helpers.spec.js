import {
  alphanumericOnly,
  calculateGst,
  calculateTotalIncludingGst,
  checkListPagingNext,
  checkNumbersOnly,
  checkObjectIsEmpty,
  decodeJwtToken,
  formatDollar,
  formatFileSize,
  integerNoDecimal,
  integerWithTwoDecimal,
  isoDateTolocaleDate,
  localeDateToIsoDate,
  matchForPreApprovalRegExp,
  roundToNearest,
  roundTwoDecimal,
  stepCounter,
  sumOfFormSelectorFieldsArray,
  sumOfFormSelectorFieldsObject,
  sumOfFormSelectorWithTwoDecimalsFieldsArray,
  sumOfFormSelectorWithTwoDecimalsFieldsObject
} from 'utils/helpers'

describe('(Helper) alphanumericOnly', () => {
  it('should only accepts alphanumericOnly values', () => {
    expect(alphanumericOnly()).to.equal('')
    expect(alphanumericOnly('')).to.equal('')
    expect(alphanumericOnly('abc')).to.equal('abc')
    expect(alphanumericOnly(123)).to.equal('')
    expect(alphanumericOnly(123.123)).to.equal('')
    expect(alphanumericOnly('123')).to.equal('123')
    expect(alphanumericOnly('123.123')).to.equal('123123')
    expect(alphanumericOnly('0123')).to.equal('0123')
    expect(alphanumericOnly('0123abc')).to.equal('0123abc')
    expect(alphanumericOnly('abc0123')).to.equal('abc0123')
    expect(alphanumericOnly('$100.00')).to.equal('10000')
    expect(alphanumericOnly('~!@#$%^&*()_+')).to.equal('')
  })
})

describe('(Helper) calculateGst', () => {
  it('should calculate GST values', () => {
    expect(calculateGst()).to.equal(0)
    expect(calculateGst(null)).to.equal(0)
    expect(calculateGst(undefined)).to.equal(0)
    expect(calculateGst('')).to.equal(0)
    expect(calculateGst('abc')).to.equal(0)
    expect(calculateGst('abc0123')).to.equal(0)
    expect(calculateGst('0123abc')).to.equal(0)
    expect(calculateGst('$1.00')).to.equal(0)
    expect(calculateGst('~!@#$%^&*()_+')).to.equal(0)
    expect(calculateGst(0)).to.equal(0)
    expect(calculateGst(0.00)).to.equal(0)
    expect(calculateGst(0.01)).to.equal(0.00)
    expect(calculateGst(0.02)).to.equal(0.00)
    expect(calculateGst(0.03)).to.equal(0.00)
    expect(calculateGst(0.04)).to.equal(0.01)
    expect(calculateGst(0.05)).to.equal(0.01)
    expect(calculateGst(0.06)).to.equal(0.01)
    expect(calculateGst(0.07)).to.equal(0.01)
    expect(calculateGst(0.08)).to.equal(0.01)
    expect(calculateGst(0.09)).to.equal(0.01)
    expect(calculateGst(0.10)).to.equal(0.02)
    expect(calculateGst(0.11)).to.equal(0.02)
    expect(calculateGst(0.12)).to.equal(0.02)
    expect(calculateGst(0.13)).to.equal(0.02)
    expect(calculateGst(0.14)).to.equal(0.02)
    expect(calculateGst(0.15)).to.equal(0.02)
    expect(calculateGst(0.16)).to.equal(0.02)
    expect(calculateGst(0.17)).to.equal(0.03)
    expect(calculateGst(0.18)).to.equal(0.03)
    expect(calculateGst(0.19)).to.equal(0.03)
    expect(calculateGst(0.20)).to.equal(0.03)
    expect(calculateGst(0.21)).to.equal(0.03)
    expect(calculateGst(0.22)).to.equal(0.03)
    expect(calculateGst(0.23)).to.equal(0.03)
    expect(calculateGst(0.24)).to.equal(0.04)
    expect(calculateGst(0.25)).to.equal(0.04)
    expect(calculateGst(0.95)).to.equal(0.14)
    expect(calculateGst(0.96)).to.equal(0.14)
    expect(calculateGst(0.97)).to.equal(0.15)
    expect(calculateGst(0.98)).to.equal(0.15)
    expect(calculateGst(0.99)).to.equal(0.15)
    expect(calculateGst(1)).to.equal(0.15)
    expect(calculateGst(1.5)).to.equal(0.22)
    expect(calculateGst(10)).to.equal(1.50)
    expect(calculateGst(100)).to.equal(15.00)
    expect(calculateGst(1000)).to.equal(150.00)
    expect(calculateGst(9999999)).to.equal(1499999.85)
  })
})

describe('(Helper) checkListPagingNext', () => {
  it('should check for empty array or non-array arguments', () => {
    expect(checkListPagingNext()).to.equal(false)
    expect(checkListPagingNext([])).to.equal(false)
    expect(checkListPagingNext({})).to.equal(false)
    expect(checkListPagingNext({
      rel: 'next',
      method: 'GET',
      url: 'aaa'
    })).to.equal(false)
    expect(checkListPagingNext(2)).to.equal(false)
    expect(checkListPagingNext('last')).to.equal(false)
  })
  it('should return true if paging exists', () => {
    expect(checkListPagingNext([
      {
        rel: 'first',
        method: 'GET',
        url: 'aaa'
      },
      {
        rel: 'previous',
        method: 'GET',
        url: 'aaa'
      }
    ])).to.equal(false)
    expect(checkListPagingNext([
      {
        rel: 'first',
        method: 'GET',
        url: 'aaa'
      },
      {
        rel: 'next',
        method: 'GET',
        url: 'aaa'
      }
    ])).to.equal(true)
    expect(checkListPagingNext([
      {
        rel: 'first',
        method: 'GET',
        url: 'aaa'
      },
      {
        rel: 'last',
        method: 'GET',
        url: 'aaa'
      }
    ])).to.equal(true)
    expect(checkListPagingNext([
      {
        rel: 'first',
        method: 'GET',
        url: 'aaa'
      },
      {
        rel: 'next',
        method: 'GET',
        url: 'aaa'
      },
      {
        rel: 'last',
        method: 'GET',
        url: 'aaa'
      }
    ])).to.equal(true)
  })
})

describe('(Helper) checkNumbersOnly', () => {
  it('should only allow numbers', () => {
    expect(checkNumbersOnly('xyz')).to.equal('')
    expect(checkNumbersOnly('x1z')).to.equal('1')
    expect(checkNumbersOnly('1yz')).to.equal('1')
    expect(checkNumbersOnly('1y3')).to.equal('13')
    expect(checkNumbersOnly('0yz')).to.equal('0')
  })
})

describe('(Helper) checkObjectIsEmpty', () => {
  it('should check and return true for empty object', () => {
    expect(checkObjectIsEmpty({})).to.equal(true)
    expect(checkObjectIsEmpty({ a: 'a' })).to.equal(false)
  })
})

describe('(Helper) decodeJwtToken', () => {
  it('should handle invalid JWT token', () => {
    const token = undefined
    expect(decodeJwtToken(token)).to.deep.equal({
      email: '',
      name: ''
    })
    const token2 = null
    expect(decodeJwtToken(token2)).to.deep.equal({
      email: '',
      name: ''
    })
    const token3 = 123
    expect(decodeJwtToken(token3)).to.deep.equal({
      email: '',
      name: ''
    })
    const token4 = ''
    expect(decodeJwtToken(token4)).to.deep.equal({
      email: '',
      name: ''
    })
    const token5 = 'asdfasdf'
    expect(decodeJwtToken(token5)).to.deep.equal({
      email: '',
      name: ''
    })
  })

  it('should decode JWT token', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJhYWEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiYmJiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiY2NjIiwiZW1haWwiOiJkZGQiLCJpYXQiOjE0OTg2MDQyMDN9.IG-6udBc_0RULTqeS5rHsTuVNbP3g9sLMXHjPLMlMyQ'
    expect(decodeJwtToken(token)).to.deep.equal({
      email: 'ddd',
      name: 'aaa bbb'
    })
    const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJhYWEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiYmJiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiIiwiZW1haWwiOiJkZGQiLCJpYXQiOjE0OTg2MDQzMzd9.SDSn9Bxgw332StFFtm9YA8tbZ4wjHtgIekj3nMdemBs'
    expect(decodeJwtToken(token2)).to.deep.equal({
      email: 'ddd',
      name: 'aaa bbb'
    })
  })


  it('should decode JWT token without firstName', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiYmJiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiY2NjIiwiZW1haWwiOiJkZGQiLCJpYXQiOjE0OTg2MDQzMDd9.9Qem4djMb-94dLeR8MTZW2jRB3E7V_N2jQZCGxZFV0w'
    expect(decodeJwtToken(token)).to.deep.equal({
      email: 'ddd',
      name: 'bbb'
    })
    const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiYmJiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiY2NjIiwiZW1haWwiOiJkZGQiLCJpYXQiOjE0OTg2MDQzNjZ9.6LKhCvcNIWMbVyhpwG0fGx1k_w_arJUC7XvLiztfiFU'
    expect(decodeJwtToken(token2)).to.deep.equal({
      email: 'ddd',
      name: 'bbb'
    })
  })

  it('should decode JWT token without lastName', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJhYWEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiY2NjIiwiZW1haWwiOiJkZGQiLCJpYXQiOjE0OTg2MDQzMjR9.s_UZ22rX7VsypqbyuR_DAGTLOrIjBZ0parhCDNDO7WI'
    expect(decodeJwtToken(token)).to.deep.equal({
      email: 'ddd',
      name: 'aaa'
    })
    const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJhYWEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJjY2MiLCJlbWFpbCI6ImRkZCIsImlhdCI6MTQ5ODYwNDM3OX0._vZEyxtb2SAo7jqeZCMN0tORTvKZXGxUpdT_nFGFN8c'
    expect(decodeJwtToken(token2)).to.deep.equal({
      email: 'ddd',
      name: 'aaa'
    })
  })

  it('should decode JWT token without firstName or lastName', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJjY2MiLCJlbWFpbCI6ImRkZCIsImlhdCI6MTQ5ODYwNjA5MX0.-YFRcGaH88cbqZlfXJ1updVH9WmQ7rlYrwFHiGW6Y1U'
    expect(decodeJwtToken(token)).to.deep.equal({
      email: 'ddd',
      name: ''
    })
  })

  it('should decode JWT token without email', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJhYWEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiYmJiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiY2NjIiwiZW1haWwiOiIiLCJpYXQiOjE0OTg2MDQzNDl9.cwfCuJn-hrKbIuOXWbJqdIYEzqme5eHEObtl7mbnKek'
    expect(decodeJwtToken(token)).to.deep.equal({
      email: '',
      name: 'aaa bbb'
    })
  })

  it('should decode JWT token from example provided by NIB', () => {
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI4NDgyQTJDN0RGMzI0Njk3RkI1RjY4OEMyRjhGODQ5OEZGOTU0QzQiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJLRWdxTEgzekpHbF90ZmFJd3ZqNFNZXzVWTVEifQ.eyJuYmYiOjE0OTg1OTkyNzEsImV4cCI6MTQ5ODU5OTg3MSwiaXNzIjoiaHR0cHM6Ly9hdXRoLm5pZ2h0bHkubmlibnoubmliZG9tLmNvbS5hdTo4OTk5IiwiYXVkIjpbImh0dHBzOi8vYXV0aC5uaWdodGx5Lm5pYm56Lm5pYmRvbS5jb20uYXU6ODk5OS9yZXNvdXJjZXMiLCJOaWIuQXBpIl0sImNsaWVudF9pZCI6Im5pYlByb3ZpZGVyUG9ydGFsIiwic3ViIjoiNEYxMDg3NDQtNTExRC00RTM0LTg1NEEtM0YyQzgyMTI4OTA1IiwiYXV0aF90aW1lIjoxNDk4NTk1MDQ2LCJpZHAiOiJsb2NhbCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6IlNsYXZhIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3VybmFtZSI6IlJlc25payIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InByb3ZpZGVyIiwiZW1haWwiOiJ0aHJlZS1wcm92aWRlcnMtbWl4ZWQtMkBleGFtcGxlLm9yZyIsInNjb3BlIjpbImNsYWltczphcGkiLCJjbGFpbXM6cHJvdmlkZXIiLCJwb2xpY3k6YXBpIiwicG9saWN5OnByb3ZpZGVyIl0sImFtciI6WyJwd2QiXX0.erXKaSgdGOpk3rZenSSI2OZAge2AgRhWFqvLlZF581GtPbfy_V11LDeZQ6V6IDP1jnRNEJ5bKNFFUTeMamgx6M65yoiHvwPWZUGLD7faa9kT2sE-n19-6WNv_uiTfz_Igri74f2NSxJd-gcs5tsY2jMX1DVzx9lN7hxouaXRPfCnfeFQ2HWquysI4IIwRbzE8bCM2HpNJz1r2Odl0GUaeeNJa0Y-_pIZXc6g-I4exGXDaCvw_auv5g9dUITEMimj2W6b6QCVRsZuG1vbjPhO-SZ_VCh2hJztLeP2Xw4jj50GRE9ClaBF5ihb167u3yCp60mhLz4E3Dnpv0MpjeClEBqf6qvBBUfzDfLB2FqGDOntMez8NaxRz9YuxqKUIsltsNIYOab2fI5e2_ntSEBlsfXCvIZ8IYh2GS6B3UPRbdDn2siKheEUp5YyeW6Z55z5AZcmDQHeuRnxwx-K6fLnhAu9IFX3k3ByZI6UPFq6V8b0wb-TODIxRz2x7CItVy4UTIvkRV-R6D3FjO6XChhyD3ICcVtbxfdp99TNDLUcPvpl74s2KntaKdnRagnh0oCKeYq5g8uykGFsqBTPHKXWWIR_SA9gSt6p_3gVCpxV6rt7Hvxd9uZUd8Vbb-KJjvave5hgqUZHwall9a8eQcItYmfWa8UHLHHw7yqicVTTDag'
    expect(decodeJwtToken(token)).to.deep.equal({
      email: 'three-providers-mixed-2@example.org',
      name: 'Slava Resnik'
    })
  })
})

describe('(Helper) formatDollar', () => {
  it('should put $ sign in front', () => {
    expect(formatDollar()).to.equal('')
    expect(formatDollar('')).to.equal('')
    expect(formatDollar(123)).to.equal('$ 123')
    expect(formatDollar('123')).to.equal('$ 123')
    expect(formatDollar(123.123)).to.equal('$ 123.123')
    expect(formatDollar('123.123')).to.equal('$ 123.123')
  })
})

describe('(Helper) formatFileSize', () => {
  it('should format byte size correctly', () => {
    expect(formatFileSize(0, 0)).to.equal('0 bytes')
    expect(formatFileSize(12345)).to.equal('12.06 kb')
    expect(formatFileSize(12345, 1)).to.equal('12.1 kb')
  })
})

describe('(Helper) calculateTotalIncludingGst', () => {
  it('should include GST values', () => {
    expect(calculateTotalIncludingGst()).to.equal(0)
    expect(calculateTotalIncludingGst(null)).to.equal(0)
    expect(calculateTotalIncludingGst(undefined)).to.equal(0)
    expect(calculateTotalIncludingGst('')).to.equal(0)
    expect(calculateTotalIncludingGst('abc')).to.equal(0)
    expect(calculateTotalIncludingGst('abc0123')).to.equal(0)
    expect(calculateTotalIncludingGst('0123abc')).to.equal(0)
    expect(calculateTotalIncludingGst('$1.00')).to.equal(0)
    expect(calculateTotalIncludingGst('~!@#$%^&*()_+')).to.equal(0)
    expect(calculateTotalIncludingGst(0)).to.equal(0)
    expect(calculateTotalIncludingGst(0.00)).to.equal(0)
    expect(calculateTotalIncludingGst(0.01)).to.equal(0.01)
    expect(calculateTotalIncludingGst(0.02)).to.equal(0.02)
    expect(calculateTotalIncludingGst(0.03)).to.equal(0.03)
    expect(calculateTotalIncludingGst(0.04)).to.equal(0.05)
    expect(calculateTotalIncludingGst(0.05)).to.equal(0.06)
    expect(calculateTotalIncludingGst(0.06)).to.equal(0.07)
    expect(calculateTotalIncludingGst(0.07)).to.equal(0.08)
    expect(calculateTotalIncludingGst(0.08)).to.equal(0.09)
    expect(calculateTotalIncludingGst(0.09)).to.equal(0.10)
    expect(calculateTotalIncludingGst(0.10)).to.equal(0.12)
    expect(calculateTotalIncludingGst(0.11)).to.equal(0.13)
    expect(calculateTotalIncludingGst(0.12)).to.equal(0.14)
    expect(calculateTotalIncludingGst(0.13)).to.equal(0.15)
    expect(calculateTotalIncludingGst(0.14)).to.equal(0.16)
    expect(calculateTotalIncludingGst(0.15)).to.equal(0.17)
    expect(calculateTotalIncludingGst(0.16)).to.equal(0.18)
    expect(calculateTotalIncludingGst(0.17)).to.equal(0.20)
    expect(calculateTotalIncludingGst(0.18)).to.equal(0.21)
    expect(calculateTotalIncludingGst(0.19)).to.equal(0.22)
    expect(calculateTotalIncludingGst(0.20)).to.equal(0.23)
    expect(calculateTotalIncludingGst(0.21)).to.equal(0.24)
    expect(calculateTotalIncludingGst(0.22)).to.equal(0.25)
    expect(calculateTotalIncludingGst(0.23)).to.equal(0.26)
    expect(calculateTotalIncludingGst(0.24)).to.equal(0.28)
    expect(calculateTotalIncludingGst(0.25)).to.equal(0.29)
    expect(calculateTotalIncludingGst(0.95)).to.equal(1.09)
    expect(calculateTotalIncludingGst(0.96)).to.equal(1.10)
    expect(calculateTotalIncludingGst(0.97)).to.equal(1.12)
    expect(calculateTotalIncludingGst(0.98)).to.equal(1.13)
    expect(calculateTotalIncludingGst(0.99)).to.equal(1.14)
    expect(calculateTotalIncludingGst(1)).to.equal(1.15)
    expect(calculateTotalIncludingGst(1.5)).to.equal(1.72)
    expect(calculateTotalIncludingGst(10)).to.equal(11.50)
    expect(calculateTotalIncludingGst(100)).to.equal(115.00)
    expect(calculateTotalIncludingGst(1000)).to.equal(1150.00)
    expect(calculateTotalIncludingGst(9999999)).to.equal(11499998.85)
  })
})

describe('(Helper) integerWithTwoDecimal', () => {
  it('should always have two decimal places in value', () => {
    expect(integerWithTwoDecimal()).to.equal('0.00')
    expect(integerWithTwoDecimal('')).to.equal('0.00')
    expect(integerWithTwoDecimal('0')).to.equal('0.00')
    expect(integerWithTwoDecimal('abc')).to.equal('0.00')
    expect(integerWithTwoDecimal(0)).to.equal('0.00')
    expect(integerWithTwoDecimal(123)).to.equal('1.23')
    expect(integerWithTwoDecimal(123.123)).to.equal('1231.23')
    expect(integerWithTwoDecimal('123')).to.equal('1.23')
    expect(integerWithTwoDecimal('123.1')).to.equal('12.31')
    expect(integerWithTwoDecimal('123.12')).to.equal('123.12')
    expect(integerWithTwoDecimal('123.123')).to.equal('1231.23')
    expect(integerWithTwoDecimal('123.1234')).to.equal('12312.34')
    expect(integerWithTwoDecimal('0123')).to.equal('1.23')
    expect(integerWithTwoDecimal('0123.1')).to.equal('12.31')
    expect(integerWithTwoDecimal('0123.12')).to.equal('123.12')
    expect(integerWithTwoDecimal('0123.123')).to.equal('1231.23')
    expect(integerWithTwoDecimal('0123.1234')).to.equal('12312.34')
    expect(integerWithTwoDecimal('00123')).to.equal('1.23')
    expect(integerWithTwoDecimal('00123.1')).to.equal('12.31')
    expect(integerWithTwoDecimal('00123.12')).to.equal('123.12')
    expect(integerWithTwoDecimal('00123.123')).to.equal('1231.23')
    expect(integerWithTwoDecimal('00123.1234')).to.equal('12312.34')
    expect(integerWithTwoDecimal('00123.12.34')).to.equal('12312.34')
  })
})

describe('(Helper) integerNoDecimal', () => {
  it('should remove decimals in number', () => {
    expect(integerNoDecimal()).to.equal('')
    expect(integerNoDecimal('')).to.equal('')
    expect(integerNoDecimal('abc')).to.equal('')
    expect(integerNoDecimal(123)).to.equal('')
    expect(integerNoDecimal(123.123)).to.equal('')
    expect(integerNoDecimal('123')).to.equal('123')
    expect(integerNoDecimal('123.123')).to.equal('123123')
    expect(integerNoDecimal('0123')).to.equal('123')
    expect(integerNoDecimal('0123.123')).to.equal('123123')
    expect(integerNoDecimal('00123')).to.equal('123')
    expect(integerNoDecimal('00123.123')).to.equal('123123')
  })
})

describe('(Helper) isoDateTolocaleDate', () => {
  it('should convert ISO date format to Locale date format', () => {
    expect(isoDateTolocaleDate('1999-01-31')).to.equal('31/01/1999')
    expect(isoDateTolocaleDate()).to.equal(undefined)
    expect(isoDateTolocaleDate('')).to.equal(undefined)
    expect(isoDateTolocaleDate('abc')).to.equal(undefined)
    expect(isoDateTolocaleDate('123')).to.equal(undefined)
  })
})

describe('(Helper) localeDateToIsoDate', () => {
  it('should convert Locale date format to ISO date format', () => {
    expect(localeDateToIsoDate('31/01/1999')).to.equal('1999-01-31')
    expect(localeDateToIsoDate()).to.equal(undefined)
    expect(localeDateToIsoDate('')).to.equal(undefined)
    expect(localeDateToIsoDate('abc')).to.equal(undefined)
    expect(localeDateToIsoDate('123')).to.equal(undefined)
  })
})

describe('(Helper) matchForPreApprovalRegExp', () => {
  it('should only accepts specific patterns', () => {
    expect(matchForPreApprovalRegExp('')).to.equal('')
    expect(matchForPreApprovalRegExp('123')).to.equal('123')
    expect(matchForPreApprovalRegExp('123.123')).to.equal('123123')
    expect(matchForPreApprovalRegExp('0123')).to.equal('0123')
    expect(matchForPreApprovalRegExp('0123abc')).to.equal('0123abc')
    expect(matchForPreApprovalRegExp('0123/abc')).to.equal('0123/abc')
    expect(matchForPreApprovalRegExp('0123/abc/123')).to.equal('0123/abc/123')
    expect(matchForPreApprovalRegExp(123)).to.equal('')
  })
})

describe('(Helper) roundToNearest', () => {
  it('should round input to the nearest divisor', () => {
    expect(roundToNearest('+', NaN, 5)).to.equal(5)
    expect(roundToNearest('-', NaN, 5)).to.equal(0)
    expect(roundToNearest('+', '', 5)).to.equal(5)
    expect(roundToNearest('-', '', 5)).to.equal(0)
    expect(roundToNearest('+', -5, 5)).to.equal(0)
    expect(roundToNearest('-', -5, 5)).to.equal(-10)
    expect(roundToNearest('+', -10, 5)).to.equal(-5)
    expect(roundToNearest('-', -10, 5)).to.equal(-15)
    expect(roundToNearest('+', -11, 5)).to.equal(-10)
    expect(roundToNearest('-', -11, 5)).to.equal(-15)
    expect(roundToNearest('+', -7, 5)).to.equal(-5)
    expect(roundToNearest('-', -7, 5)).to.equal(-10)
    expect(roundToNearest('+', -1, 5)).to.equal(0)
    expect(roundToNearest('-', -1, 5)).to.equal(-5)
    expect(roundToNearest('-', -1, 5, true)).to.equal(0)
    expect(roundToNearest('+', 0, 5)).to.equal(5)
    expect(roundToNearest('+', 5, 0)).to.equal(0)
    expect(roundToNearest('+', 5, 0, true)).to.equal(0)
    expect(roundToNearest('+', 0, 0)).to.equal(0)
    expect(roundToNearest('+', 0, 0, true)).to.equal(0)
    expect(roundToNearest('-', 0, 0, true)).to.equal(0)
    expect(roundToNearest('-', 0, 0)).to.equal(0)
    expect(roundToNearest('-', 5, 0, true)).to.equal(0)
    expect(roundToNearest('-', 5, 0)).to.equal(0)
    expect(roundToNearest('-', 0, 5)).to.equal(0)
    expect(roundToNearest('-', 0, 5, true)).to.equal(0)
    expect(roundToNearest('+', 1, 5)).to.equal(5)
    expect(roundToNearest('-', 1, 5)).to.equal(0)
    expect(roundToNearest('+', 2, 4)).to.equal(4)
    expect(roundToNearest('-', 2, 4)).to.equal(0)
    expect(roundToNearest('+', 7, 5)).to.equal(10)
    expect(roundToNearest('-', 7, 5)).to.equal(5)
    expect(roundToNearest('+', 7, 5, true)).to.equal(10)
    expect(roundToNearest('-', 7, 5, true)).to.equal(5)
    expect(roundToNearest('+', 5, 5, true)).to.equal(10)
    expect(roundToNearest('-', 5, 5, true)).to.equal(0)
    expect(roundToNearest('+', 10, 5, true)).to.equal(15)
    expect(roundToNearest('-', 10, 5, true)).to.equal(5)
    expect(roundToNearest('+', 11, 5, true)).to.equal(15)
    expect(roundToNearest('-', 11, 5, true)).to.equal(10)
  })
})

describe('(Helper) roundTwoDecimal', () => {
  it('should calculate GST values', () => {
    expect(roundTwoDecimal()).to.equal(0)
    expect(roundTwoDecimal(null)).to.equal(0)
    expect(roundTwoDecimal(undefined)).to.equal(0)
    expect(roundTwoDecimal('')).to.equal(0)
    expect(roundTwoDecimal('abc')).to.equal(0)
    expect(roundTwoDecimal('abc0123')).to.equal(0)
    expect(roundTwoDecimal('0123abc')).to.equal(0)
    expect(roundTwoDecimal('$1.00')).to.equal(0)
    expect(roundTwoDecimal('~!@#$%^&*()_+')).to.equal(0)
    expect(roundTwoDecimal(0)).to.equal(0)
    expect(roundTwoDecimal(0.00)).to.equal(0)
    expect(roundTwoDecimal(0.004)).to.equal(0.00)
    expect(roundTwoDecimal(0.005)).to.equal(0.01)
    expect(roundTwoDecimal(1.014)).to.equal(1.01)
    expect(roundTwoDecimal(1.015)).to.equal(1.02)
  })
})

describe('(Helper) stepCounter', () => {
  it('should increment and decrement count to the nearest step', () => {
    expect(stepCounter('+', NaN, 2, true)).to.equal(2)
    expect(stepCounter('-', NaN, 2, true)).to.equal(0)
    expect(stepCounter('+', -7, 2)).to.equal(-5)
    expect(stepCounter('-', -7, 2)).to.equal(-9)
    expect(stepCounter('-', -7, 2)).to.equal(-9)
    expect(stepCounter('+', -1, 2)).to.equal(1)
    expect(stepCounter('-', -1, 2)).to.equal(-3)
    expect(stepCounter('+', 0, 2)).to.equal(2)
    expect(stepCounter('+', 0, 0)).to.equal(0)
    expect(stepCounter('+', 0, 0, true)).to.equal(0)
    expect(stepCounter('-', 0, 0, true)).to.equal(0)
    expect(stepCounter('-', 0, 0)).to.equal(0)
    expect(stepCounter('-', 0, 2)).to.equal(-2)
    expect(stepCounter('+', 1, 2)).to.equal(3)
    expect(stepCounter('-', 1, 2)).to.equal(-1)
    expect(stepCounter('+', 7, 2)).to.equal(9)
    expect(stepCounter('-', 7, 2)).to.equal(5)
    expect(stepCounter('+', -15, 15)).to.equal(0)
    expect(stepCounter('+', -15, 15, true)).to.equal(0)
    expect(stepCounter('-', -15, 15)).to.equal(-30)
    expect(stepCounter('-', -15, 15, true)).to.equal(0)
  })

  it('should increment and decrement count to the nearest step on positive inputs only', () => {
    expect(stepCounter('+', NaN, 2, true)).to.equal(2)
    expect(stepCounter('-', NaN, 2, true)).to.equal(0)
    expect(stepCounter('+', -7, 2, true)).to.equal(0)
    expect(stepCounter('-', -7, 2, true)).to.equal(0)
    expect(stepCounter('-', -7, 2, true)).to.equal(0)
    expect(stepCounter('+', -1, 2, true)).to.equal(0)
    expect(stepCounter('-', -1, 2, true)).to.equal(0)
    expect(stepCounter('+', 0, 2, true)).to.equal(2)
    expect(stepCounter('-', 0, 2, true)).to.equal(0)
    expect(stepCounter('+', 1, 2, true)).to.equal(3)
    expect(stepCounter('-', 1, 2, true)).to.equal(-1)
    expect(stepCounter('+', 7, 2, true)).to.equal(9)
    expect(stepCounter('-', 7, 2, true)).to.equal(5)
  })
})

describe('(Helper) sumOfFormSelectorFieldsArray', () => {
  it('should total all valid formSelectorFields nested array', () => {
    expect(sumOfFormSelectorFieldsArray([])).to.equal(0)
    expect(
      sumOfFormSelectorFieldsArray([{ a: 2 }, { a: 4 }, { a: 6 }])
    ).to.equal(12)
    expect(
      sumOfFormSelectorFieldsArray(
        [
          { a: 2 },
          { b: 4 },
          { c: 6 }
        ]
      )
    ).to.equal(12)
    expect(
      sumOfFormSelectorFieldsArray(
        [
          { a: 2 },
          { b: 4 },
          { c: [] }
        ]
      )
    ).to.equal(6)
    expect(
      sumOfFormSelectorFieldsArray(
        [
          { a: 2 },
          { b: 4 },
          { c: [] },
          { d: '5' }
        ], ['b']
      )
    ).to.equal(7)
    expect(
      sumOfFormSelectorFieldsArray(
        [
          { a: 2 },
          { b: 4 },
          { c: [] },
          { d: '5' }
        ], ['b']
      )
    ).to.equal(7)
    expect(
      sumOfFormSelectorFieldsArray(
        [
          { a: 'a' },
          { b: 'b' },
          { c: 'c' }
        ]
      )
    ).to.equal(0)
    expect(
      sumOfFormSelectorFieldsArray([
        { w: '02' },
        { x: '4' },
        { y: '6aaa' },
        { z: 8 }
      ])
    ).to.equal(20)
    expect(
      sumOfFormSelectorFieldsArray([{ b: 'abc' }, { b: '4' }, { b: '6aaa' }])
    ).to.equal(10)
  })
})

describe('(Helper) sumOfFormSelectorFieldsObject', () => {
  it('should total all valid formSelectorFields object', () => {
    expect(sumOfFormSelectorFieldsObject({})).to.equal(0)
    expect(
      sumOfFormSelectorFieldsObject({
        a: 2,
        b: 4,
        c: 6
      })
    ).to.equal(12)
    expect(
      sumOfFormSelectorFieldsObject({
        w: '02',
        x: '4',
        y: '6aaa',
        z: 8
      })
    ).to.equal(20)
    expect(
      sumOfFormSelectorFieldsObject({
        x: 'abc',
        y: '4',
        z: '6aaa'
      })
    ).to.equal(10)
    expect(
      sumOfFormSelectorFieldsObject({
        a: '1',
        b: '1',
        c: '1',
        d: 1,
        e: [],
        x: [{ a: '1' }, { c: '1' }],
        y: [],
        z: [{ b: '1' }, { b: '1' }, { b: '1' }, { b: '1' }, { b: '1' }, '2']
      }, ['c'])
    ).to.equal(12)
    expect(
      sumOfFormSelectorFieldsObject({
        a: '1',
        b: '1',
        c: '1',
        x: [{ a: '1' }, { a: 'a' }],
        y: undefined,
        z: [{ b: '1' }, { b: 'abc' }, { b: '1' }, { b: '$10' }, { b: '1' }]
      })
    ).to.equal(7)
    expect(
      sumOfFormSelectorFieldsObject({
        specialistCost: '4',
        consultationCost: '3',
        otherProcedures: [
          {
            specialistCost: '1',
            primaryProcedure: [
              {
                name: 'Skin - Scar revision face',
                id: 'eceb8b8e-3a13-468d-b805-0f11b85ef30e',
                code: '45506-00',
                displayName: 'Skin - Scar revision face',
                links: [
                  {
                    rel: 'self',
                    method: 'GET',
                    url: 'http://test'
                  },
                  {
                    rel: 'list-related-interventions',
                    method: 'GET',
                    url: 'http://test'
                  },
                  {
                    rel: 'find-related-interventions-by-name',
                    method: 'GET',
                    url: 'http://test'
                  }
                ]
              }
            ]
          },
          {
            primaryProcedure: [
              {
                name: 'Skin - Scar Revision neck',
                id: 'b3b999df-9842-43a6-8b20-bce1ec2470e3',
                code: '45506-01',
                displayName: 'Skin - Scar Revision neck',
                links: [
                  {
                    rel: 'self',
                    method: 'GET',
                    url: 'http://test'
                  },
                  {
                    rel: 'list-related-interventions',
                    method: 'GET',
                    url: 'http://test'
                  },
                  {
                    rel: 'find-related-interventions-by-name',
                    method: 'GET',
                    url: 'http://test'
                  }
                ]
              }
            ],
            specialistCost: '2'
          }
        ]
      })
    ).to.equal(10)
    expect(
      sumOfFormSelectorFieldsObject({
        specialistCost: '1',
        consultationCost: '1',
        otherCosts: [
          {
            otherCost: '1'
          }
        ],
        otherProcedures: [
          {
            primaryProcedure: [
              {
                name: 'Skin - Scar Revision neck',
                id: 'b3b999df-9842-43a6-8b20-bce1ec2470e3',
                code: '45506-01',
                displayName: 'Skin - Scar Revision neck',
                links: [
                  {
                    rel: 'self',
                    method: 'GET',
                    url: 'http://test'
                  },
                  {
                    rel: 'list-related-interventions',
                    method: 'GET',
                    url: 'http://test'
                  },
                  {
                    rel: 'find-related-interventions-by-name',
                    method: 'GET',
                    url: 'http://test'
                  }
                ]
              }
            ],
            specialistCost: '1'
          }
        ]
      })
    ).to.equal(4)
  })
})

describe('(Helper) sumOfFormSelectorWithTwoDecimalsFieldsArray', () => {
  it('should total all valid formSelectorFields nested array', () => {
    expect(sumOfFormSelectorWithTwoDecimalsFieldsArray([])).to.equal(0)
    expect(
      sumOfFormSelectorWithTwoDecimalsFieldsArray([{ a: 2 }, { a: 4 }, { a: 6 }])
    ).to.equal(12)
    expect(
      sumOfFormSelectorWithTwoDecimalsFieldsArray(
        [
          { a: 2.1 },
          { b: 4.1 },
          { c: 6.1 },
          { d: 6.1 }
        ], ['b', 'd']
      )
    ).to.equal(8.2)
    expect(
      sumOfFormSelectorWithTwoDecimalsFieldsArray([
        { w: '02' },
        { x: '4' },
        { y: '6aaa' },
        { z: 8 }
      ])
    ).to.equal(20)
    expect(
      sumOfFormSelectorWithTwoDecimalsFieldsArray([{ b: 'abc' }, { b: '4' }, { b: '6aaa' }])
    ).to.equal(10)
  })
})

describe('(Helper) sumOfFormSelectorWithTwoDecimalsFieldsObject', () => {
  it('should total all valid formSelectorFields object', () => {
    expect(sumOfFormSelectorWithTwoDecimalsFieldsObject({})).to.equal(0)
    expect(
      sumOfFormSelectorWithTwoDecimalsFieldsObject({
        a: 2.2,
        b: 4.4,
        c: 6.6,
        d: 3.3
      }, ['d'])
    ).to.equal(16.5)
    expect(
      sumOfFormSelectorWithTwoDecimalsFieldsObject({
        w: '02',
        x: '4',
        y: '6aaa',
        z: 8
      })
    ).to.equal(20)
    expect(
      sumOfFormSelectorWithTwoDecimalsFieldsObject({
        x: 'abc',
        y: '3.99',
        z: '6aaa'
      })
    ).to.equal(9.99)
    expect(
      sumOfFormSelectorWithTwoDecimalsFieldsObject({
        a: '1',
        b: '1',
        c: '1',
        x: [{ a: '1' }, { a: '1' }],
        y: [],
        z: [{ b: '1' }, { b: '1' }, { b: '1' }, { b: '1' }, { b: '1' }]
      })
    ).to.equal(10)
    expect(
      sumOfFormSelectorWithTwoDecimalsFieldsObject({
        a: '1',
        b: '1',
        c: '1',
        x: [{ a: '1' }, { a: 'a' }],
        y: undefined,
        z: [{ b: '1.01' }, { b: 'abc' }, { b: '1.011' }, { b: '$10' }, { b: '1.01' }]
      })
    ).to.equal(7.03)
    expect(
      sumOfFormSelectorWithTwoDecimalsFieldsObject({
        specialistCost: '4.44',
        consultationCost: '3.33',
        otherProcedures: [
          {
            specialistCost: '1.11',
            primaryProcedure: [
              {
                name: 'Skin - Scar revision face',
                id: 'eceb8b8e-3a13-468d-b805-0f11b85ef30e',
                code: '45506-00',
                displayName: 'Skin - Scar revision face',
                links: [
                  {
                    rel: 'self',
                    method: 'GET',
                    url: 'http://test'
                  },
                  {
                    rel: 'list-related-interventions',
                    method: 'GET',
                    url: 'http://test'
                  },
                  {
                    rel: 'find-related-interventions-by-name',
                    method: 'GET',
                    url: 'http://test'
                  }
                ]
              }
            ]
          },
          {
            primaryProcedure: [
              {
                name: 'Skin - Scar Revision neck',
                id: 'b3b999df-9842-43a6-8b20-bce1ec2470e3',
                code: '45506-01',
                displayName: 'Skin - Scar Revision neck',
                links: [
                  {
                    rel: 'self',
                    method: 'GET',
                    url: 'http://test'
                  },
                  {
                    rel: 'list-related-interventions',
                    method: 'GET',
                    url: 'http://test'
                  },
                  {
                    rel: 'find-related-interventions-by-name',
                    method: 'GET',
                    url: 'http://test'
                  }
                ]
              }
            ],
            specialistCost: '2.22'
          }
        ]
      })
    ).to.equal(11.1)
    expect(
      sumOfFormSelectorWithTwoDecimalsFieldsObject({
        specialistCost: '1',
        consultationCost: '1',
        otherCosts: [
          {
            otherCost: '1'
          }
        ],
        otherProcedures: [
          {
            primaryProcedure: [
              {
                name: 'Skin - Scar Revision neck',
                id: 'b3b999df-9842-43a6-8b20-bce1ec2470e3',
                code: '45506-01',
                displayName: 'Skin - Scar Revision neck',
                links: [
                  {
                    rel: 'self',
                    method: 'GET',
                    url: 'http://test'
                  },
                  {
                    rel: 'list-related-interventions',
                    method: 'GET',
                    url: 'http://test'
                  },
                  {
                    rel: 'find-related-interventions-by-name',
                    method: 'GET',
                    url: 'http://test'
                  }
                ]
              }
            ],
            specialistCost: '1'
          }
        ]
      })
    ).to.equal(4)
  })
})
