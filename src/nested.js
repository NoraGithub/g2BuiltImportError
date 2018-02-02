/**
 * @fileOverview 分面的基类
 * @author dxq613@gmail.com
 */

import Base from '@antv/g2/src/facet/base';






/**
 * Nested 和 Rect 完全一样
 * @class Facets.Nested
 */
class Nested extends Base {

 getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'nested';
    return cfg;
  }

  generateFacets(data) {
    const self = this;
    const fields = self.fields;
    // var defs = self.defs;
    const rst = [];
    let rows = 1;
    let cols = 1;
    const colField = fields[0];
    const rowField = fields[1];
    let colValues = [ '' ];
    let rowValues = [ '' ];
    if (colField) {
      colValues = self.getFieldValues(colField, data);
      cols = colValues.length;
    }
    if (rowField) {
      rowValues = self.getFieldValues(rowField, data);
      rows = rowValues.length;
    }

    // 获取每个维度对应的frame
    colValues.forEach(function(xVal, xIndex) {
      rowValues.forEach(function(yVal, yIndex) {
        const conditions = [
          { field: colField, value: xVal, values: colValues },
          { field: rowField, value: yVal, values: rowValues }
        ];
        const filter = self.getFilter(conditions);
        const subData = data.filter(filter);
        const facet = {
          type: self.type,
          colValue: xVal,
          rowValue: yVal,
          colField,
          rowField,
          colIndex: xIndex,
          rowIndex: yIndex,
          cols,
          rows,
          data: subData,
          region: self.getRegion(rows, cols, xIndex, yIndex)
        };
        rst.push(facet);
      });
    });

    return rst;
  }

  // 设置 x 坐标轴的文本、title 是否显示
  setXAxis(xField, axes, facet) {
    if (facet.rowIndex !== facet.rows - 1) {
      axes[xField].title = null;
      axes[xField].label = null;
    } else if (facet.colIndex !== parseInt((facet.cols - 1) / 2)) {
      axes[xField].title = null;
    }
  }
  // 设置 y 坐标轴的文本、title 是否显示
  setYAxis(yField, axes, facet) {
    if (facet.colIndex !== 0) {
      axes[yField].title = null;
      axes[yField].label = null;
    } else if (facet.rowIndex !== parseInt((facet.rows - 1) / 2)) {
      axes[yField].title = null;
    }
  }

  renderTitle(view, facet) {
    if (facet.rowIndex === 0) {
      this.drawColTitle(view, facet);
    }
    if (facet.colIndex === facet.cols - 1) {
      this.drawRowTitle(view, facet);
    }
  }
}

export default Nested;
