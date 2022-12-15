import {routeTest, stripSlashesFromFrontAndRear} from 'router/route-test';

describe('route-test', () => {
  describe('stripSlashesFromFrontAndRear', () => {
    it('should strip front and rear slashes', () => {
      expect(stripSlashesFromFrontAndRear('')).toBe('');
      expect(stripSlashesFromFrontAndRear('/')).toBe('');
      expect(stripSlashesFromFrontAndRear('/a/')).toBe('a');
      expect(stripSlashesFromFrontAndRear('//a//')).toBe('a');
    });
  });
  describe('routeTest', () => {
    it('should match exact routes', () => {
      expect(routeTest('/', '/')).toEqual({});
      expect(routeTest('/a', '/a')).toEqual({});
      expect(routeTest('/a', '/b')).toEqual(false);
      expect(routeTest('/a/b', '/a/b')).toEqual({});
      expect(routeTest('/a/b', '/a/a')).toEqual(false);
      expect(routeTest('/a/b', '/b/b')).toEqual(false);
    });

    it('should match initial paths', () => {
      expect(routeTest('/first/second', '/first/*')).toEqual({});
      expect(routeTest('/first/second/third', '/first/*')).toEqual({});
      expect(routeTest('/first', '/first/*')).toEqual({});
      expect(routeTest('/second/first', '/first/*')).toEqual(false);
    });

    it('should match param segments', () => {
      expect(routeTest('/', '/:foo')).toEqual(false);
      expect(routeTest('/bar', '/:foo')).toEqual({foo: 'bar'});
      expect(routeTest('/root/bar', '/root/:foo')).toEqual({foo: 'bar'});
      expect(routeTest('/root/', '/root/:foo')).toEqual(false);
    });
  });
});
