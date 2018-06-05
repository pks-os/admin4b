import Browser from 'src/js/util/browser'

if (Browser.isIE10 || Browser.isIE11) {
  Object.keys = function (obj) {
    const keys = []

    if (!obj) {
      return keys
    }

    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        keys.push(p)
      }
    }

    return keys
  }
}
