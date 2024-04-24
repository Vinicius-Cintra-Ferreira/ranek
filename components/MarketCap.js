export default {
  nome: "MarketCap",
  data() {
    return {
      marketCap: 0,
    }
  },
  template: `
    <div>
      <h2>Market Cap</h2>
      <p>Market Cap: {{marketCap}} </p>
      <dolar-real></dolar-real>
    </div>  
  `,
  methods: {  
    buscarMarketCap() {
      fetch('https://api.origamid.dev/stock/aapl/quote')
      .then(r => r.json())
      .then(body => {
        this.marketCap = body.latestPrice
      })
    },
  },
  created() {
    this.buscarMarketCap()
  }
}

import DolarReal from './DolarReal.js'
const componente2 = new Vue({
  el: '#app',
  components: {
    DolarReal,
  },
})
