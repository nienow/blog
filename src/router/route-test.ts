export const stripSlashesFromFrontAndRear = (url: string) => {
  return url.replace(/(^\/+|\/+$)/g, '');
};

export const segmentize = (url: string) => {
  return stripSlashesFromFrontAndRear(url).split('/');
};

export const routeTest = (url: string, route: string, basename: string = '/') => {
  const matches = {};
  const urlSegments = segmentize(url);
  const routeSegments = segmentize(basename + route || '');
  let max = Math.max(urlSegments.length, routeSegments.length);

  const hasWildcard = routeSegments[routeSegments.length - 1] === '*';
  if (hasWildcard) {
    routeSegments.splice(routeSegments.length - 1, 1);
  }

  const testSegment = (urlSegment, routeSegment) => {
    if (!routeSegment && hasWildcard) {
      return true;
    } else if (routeSegment && routeSegment.charAt(0) === ':') {
      const param = routeSegment.replace(':', '');
      const val = urlSegment || '';
      if (!val) {
        return false;
      }
      matches[param] = decodeURIComponent(val);
    } else if (routeSegment !== urlSegment) {
      return false;
    }
    return true;
  };

  for (let i = 0; i < max; i++) {
    const result = testSegment(urlSegments[i], routeSegments[i]);
    if (!result) {
      return false;
    }
  }
  return matches;
};

export const navigateTo = (url) => {
  window.dispatchEvent(
    new CustomEvent('[child] navigate', {
      detail: url
    } as any)
  );
};
