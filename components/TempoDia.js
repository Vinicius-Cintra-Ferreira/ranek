export default  {
  name: "TempoDia",
  data() {
    return {
      temperatura: 0,
    }
  },
  template: `
    <div>
      <h2>Tempo</h2>
      <p>Temperatura: {{temperatura}} </p>  
    </div>  
  `,  
  methods: {
    buscarTempo() {
      fetch('https://api.origamid.dev/weather/rio')
      .then(r => r.json())
      .then(body => {
        this.temperatura = body.consolidated_weather[0].max_temp.toFixed(2)
      })
    },  
  },
  created() {
    this.buscarTempo()
  },
}