function segmentize(url: string) {
  return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

const EMPTY = {};

export const routeTest = (url: string, route: string, opts) => {
  let reg = /(?:\?([^#]*))?(#.*)?$/,
    c = url.match(reg),
    matches = {},
    ret;
  if (c && c[1]) {
    let p = c[1].split('&');
    for (let i = 0; i < p.length; i++) {
      let r = p[i].split('=');
      matches[decodeURIComponent(r[0])] = decodeURIComponent(
        r.slice(1).join('=')
      );
    }
  }
  const urlSegments = segmentize(url.replace(reg, ''));
  const routeSegments = segmentize(route || '');
  let max = Math.max(urlSegments.length, routeSegments.length);
  for (let i = 0; i < max; i++) {
    if (routeSegments[i] && routeSegments[i].charAt(0) === ':') {
      let param = routeSegments[i].replace(/(^:|[+*?]+$)/g, ''),
        flags = (routeSegments[i].match(/[+*?]+$/) || EMPTY)[0] || '',
        plus = ~flags.indexOf('+'),
        star = ~flags.indexOf('*'),
        val = urlSegments[i] || '';
      if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
        ret = false;
        break;
      }
      matches[param] = decodeURIComponent(val);
      if (plus || star) {
        matches[param] = urlSegments.slice(i).map(decodeURIComponent).join('/');
        break;
      }
    } else if (routeSegments[i] !== urlSegments[i]) {
      ret = false;
      break;
    }
  }
  if (opts.default !== true && ret === false) {
    return false;
  }
  return matches;
};
