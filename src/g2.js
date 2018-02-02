import G2 from '@antv/g2';
G2.track(false);
import Facets from '@antv/g2/src/facet/index';
import Util from '@antv/g2/src/util';
import Nested from './nested';
Facets.Nested = Nested;

// 完全copy 了 chart的facet函数
G2.Chart.prototype.facet = function(type, cfg) {
    const cls = Facets[Util.upperFirst(type)];
    if (!cls) {
      throw new Error('Not support such type of facets as: ' + type);
    }
    const preFacets = this.get('facets');
    if (preFacets) {
      preFacets.destroy();
    }
    cfg.chart = this;
    const facets = new cls(cfg);
    this.set('facets', facets);
  }

export default G2;
