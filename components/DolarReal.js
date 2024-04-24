export default {
  nome: "DolarReal",
  data() {
    return {
      reais: 0,
    }
  },
  template: `
    <div>
      <h2>Dolar</h2>
      <p>Reais: {{reais}} </p>  
    </div>  
  `,
  methods: {
    buscarDolar() {
      fetch('https://api.origamid.dev/exchange/usd')
      .then(r => r.json())
      .then(body => {
        this.reais = body.rates.BRL
      })
    },
  },
  created() {
    this.buscarDolar()
  },
}