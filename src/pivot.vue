<template>
    <div>
        <div id="pivot"></div>
    </div>
</template>
<script>
import G2 from './g2'
import data from './data.json'

export default {
    mounted(){
    const chart = new G2.Chart({
      container: 'pivot',
      forceFit: true,
      height: 900,
      padding: [30, 80, 80, 80]
    });
    chart.source(data);
    chart.facet('nested', {
      fields: [ 'cut', 'clarity' ],
      eachView(view,facet) {
        view.point()
          .position('carat*price')
          .color('cut')
          .shape('circle')
          .opacity(0.3)
          .size(3);
      }
    });
    chart.render();


    }
}
</script>
