/**
 * A VERY naive memory chache, should use Service wworkers really !
 */
export class CACHE {
  static cache: any = {};

  static set(key: string, data: any) {
    CACHE.cache[key] = data;
  }

  static get(key: string): any | null {
    return CACHE.cache[key] || null;
  }
};
