setInterval(function (){
  const now_html = moment().format(moment.HTML5_FMT.DATETIME_LOCAL)
  let start_input = document.getElementById('start_date_time')
  let end_input = document.getElementById('end_date_time')
  if(start_input.max != now_html || end_input.max != now_html){
    start_input.max = now_html
    end_input.max = now_html
  }
},1000)
// ---------------------------------------------------------------------------------
// ------------------------------------ COLORS  -------------------------------------
const backgroudColors_list = ['rgba(4,30,66, 0.5)', 'rgba(151, 153, 155, 0.5)']
const borderColors_list = ['rgba(4,30,66, 1)', 'rgba(151, 153, 155, 1)']

const chart_colors = ['rgba(4,30,66, 1)', 'rgba(151, 153, 155, 1)']
// ---------------------------------------------------------------------------------
// ------------------------------------ FILTROS  -----------------------------------

var filter = {
  line: '',
  type: '',
  initial: '',
  error: false,
  variable: {
      name: '',
      unit: '',
      number: [],
      path: [],
      start_date: '',
      end_date: '',
      interval_seconds: 0,
      interval_minutes: 0,
      interval_hours: 0,
      realtime: false
  }
}

// ---------------------------------------------------------------------------------
// ------------------------------ PLOTAR GRÁFICO --------------------------------

var ctx = document.getElementById('myChart')
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: []
  },
  options: {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: ''
        },
        ticks: {
          beginAtZero: false
        }
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
    }
  }
})

// ---------------------------------------------------------------------------------
// ------------------------------ CHECKBOX TIMELINE --------------------------------

function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName('check')
  document.getElementById('start_date_time').value = null
  document.getElementById('end_date_time').value = null
  document.getElementById('range_input').value = 0

  checkboxes.forEach((item) => {
      if (item !== checkbox) {
        item.checked = false
      }
      else {
        const start_time = moment().subtract(2, 'seconds') //Subtrai 2 segundos da data original (evita trazer dados zerados)
        const end_time = moment().subtract(2, 'seconds') //Subtrai 2 segundos da data original (evita trazer dados zerados)
        
        filter.variable.start_date = ''
        filter.variable.end_date = ''
        filter.variable.interval_hours = 0
        filter.variable.interval_minutes = 0
        filter.variable.interval_seconds = 0
        filter.variable.realtime = false
        filter.error = false

        switch (item.value) {
          case 'realtime':
            filter.variable.realtime = true
            break
          case 'hour':
            filter.variable.start_date = start_time.subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss')
            filter.variable.end_date = end_time.format('YYYY-MM-DD HH:mm:ss')
            filter.variable.interval_minutes = 1
            console.log(filter.variable.start_date) //Teste (depois apagar)
            console.log(filter.variable.end_date) //Teste (depois apagar)
            break
          case 'day':
            filter.variable.start_date = start_time.subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
            filter.variable.end_date = end_time.format('YYYY-MM-DD HH:mm:ss')
            filter.variable.interval_hours = 1
            console.log(filter.variable.start_date) //Teste (depois apagar)
            console.log(filter.variable.end_date) //Teste (depois apagar)
            break
          case 'week':
            filter.variable.start_date = start_time.subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss')
            filter.variable.end_date = end_time.format('YYYY-MM-DD HH:mm:ss')
            filter.variable.interval_hours = 24
            console.log(filter.variable.start_date) //Teste (depois apagar)
            console.log(filter.variable.end_date) //Teste (depois apagar)
            break;
        }
        console.log(item.value) //Teste (depois apagar)
        myChart.data.datasets = []
      }
  })
  
}

// ---------------------------------------------------------------------------------
// -------------------------------- TOGGLE SWITCH ----------------------------------

function toggle_variaveis(id, unit) {
  var toggle = document.getElementById(id)
  
  if (toggle.checked) {
      filter.variable.name = toggle.value
      filter.variable.unit = unit
      console.log(filter.variable.name) //Teste (depois apagar)
      document.getElementsByClassName("toggle_switch").forEach(element => element.disabled = true)
      event.target.disabled = false
    }
  else {
    filter.variable.name = ""
    filter.variable.unit = ""
    console.log(filter.variable.name) //Teste (depois apagar)
    document.getElementsByClassName("toggle_switch").forEach(element => element.disabled = false)
  }
  myChart.data.datasets = []
}

// ---------------------------------------------------------------------------------
// -------------------------------- OPTION PROCESS ---------------------------------

function option_processo() {
  let option = document.getElementById("selection")
  let list_split = option.value.split('-')
  
  filter.line = list_split.shift()
  filter.initial = list_split.shift()
  filter.variable.number = list_split

  console.log(filter.line) //Teste (depois apagar)
  console.log(filter.initial) //Teste (depois apagar)
  console.log(filter.variable.number) //Teste (depois apagar)
  myChart.data.datasets = []
}

// ---------------------------------------------------------------------------------
// -------------------------------- OPTION RANGE ---------------------------------

function option_range() {
  let option = document.getElementById('range_selection')
  let input = document.getElementById('range_input')
  filter.variable.interval_seconds = 0
  filter.variable.interval_minutes = 0
  filter.variable.interval_hours = 0
  switch(option.value){
    case 'seconds':
      filter.variable.interval_seconds = parseInt(input.value)
      console.log(filter.variable.interval_seconds) //Teste (depois apagar)
      break
    case 'minutes':
      filter.variable.interval_minutes = parseInt(input.value)
      console.log(filter.variable.interval_minutes) //Teste (depois apagar)
      break
    case 'hours':
      filter.variable.interval_hours = parseInt(input.value)
      console.log(filter.variable.interval_hours) //Teste (depois apagar)
      break
    case 'days':
      filter.variable.interval_hours = (parseInt(input.value))*24
      console.log(filter.variable.interval_hours) //Teste (depois apagar)
      break
    case 'months':
      filter.variable.interval_hours = (parseInt(input.value))*30*24
      console.log(filter.variable.interval_hours) //Teste (depois apagar)
      break
  }
  range_test()
  myChart.data.datasets = []
}

// ---------------------------------------------------------------------------------
// -------------------------------- CUSTOM DATE ------------------------------------

function custom_date(id) {
  let custom_date = document.getElementById(id)
  
  document.getElementsByName('check').forEach((item) => item.checked = false)
  
  if(document.getElementById('start_date_time').value == '') {
    filter.variable.start_date = ''
  }
  else if(document.getElementById('end_date_time').value == '') {
    filter.variable.end_date = ''
  }
  
  filter.variable.interval_hours = 0
  filter.variable.interval_minutes = 0
  filter.variable.interval_seconds = 0
  filter.variable.realtime = false
  
  document.getElementById('range_selection').value = 'seconds'
  document.getElementById('range_input').value = 0
  
  if(id == 'start_date_time') {
    filter.variable.start_date = moment(custom_date.value, moment.HTML5_FMT.DATETIME_LOCAL).subtract(2, 'seconds').format('YYYY-MM-DD HH:mm:ss') //Subtrai 2 segundos da data original (evita trazer dados zerados)
    console.log(filter.variable.start_date) //Teste (depois apagar)
  }
  else if(id == 'end_date_time') {
    filter.variable.end_date = moment(custom_date.value, moment.HTML5_FMT.DATETIME_LOCAL).subtract(2, 'seconds').format('YYYY-MM-DD HH:mm:ss') //Subtrai 2 segundos da data original (evita trazer dados zerados)
    console.log(filter.variable.end_date) //Teste (depois apagar)
  }
  range_test()
  myChart.data.datasets = []
}

// ---------------------------------------------------------------------------------
// -------------------------------- TESTE RANGE ------------------------------------

function range_test() {
  if(filter.variable.start_date != '' && filter.variable.end_date != '') {
    let sum_interval = 0
    sum_interval = (filter.variable.interval_seconds) + (filter.variable.interval_minutes*60) + (filter.variable.interval_hours*60*60)
    let seconds_between = moment(filter.variable.end_date, 'YYYY-MM-DD HH:mm:ss').diff(moment(filter.variable.start_date, 'YYYY-MM-DD HH:mm:ss'), 'seconds')
    console.log(sum_interval, seconds_between) //Teste (depois apagar)
    if((seconds_between/sum_interval) > 300) {
      document.getElementById('range_error').innerHTML = 'Range must be higher'
      filter.error = true
    }
    else {
      document.getElementById('range_error').innerHTML = ''
      filter.error = false
    }
  }
  console.log('filter_error', filter.error) //Teste (depois apagar)
}




// ---------------------------------------------------------------------------------
// --------------------------------- API IGNITION ----------------------------------

let status_api = true

async function api_call(){
  raw = {
    "tag": [

    ]
  }
  filter.variable.path = []
  var path = ''
  path = '[default]' + filter.line + '/' + filter.type + '/' + filter.initial + '/' + filter.initial + '_' + filter.variable.name + '_'
  
  filter.variable.number.forEach((number) => {
    filter.variable.path.push(path + number)
  })

  console.log(filter.variable.path) //Teste (depois apagar)
  
  filter.variable.path.forEach(function(path_index){
    raw.tag.push(
      {
        "path": path_index,
        "start_date": filter.variable.start_date,
        "end_date": filter.variable.end_date,
        "interval_hours": filter.variable.interval_hours,
        "interval_minutes": filter.variable.interval_minutes,
        "interval_seconds": filter.variable.interval_seconds
      })
  })

  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'text/plain')

  let settings = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw)
  }

  const response = await fetch('http://10.251.1.132:8088/system/webdev/BiW_IoTPlatform/tags_hist', settings)
  const myJson = await response.json()

  return myJson
}



setInterval(async function() {
  if(!filter.error && filter.variable.name != '' && filter.type != '' && filter.line != '' && (filter.variable.realtime || (filter.variable.start_date != '' && filter.variable.end_date != ''))) {
    
    if(filter.variable.realtime) {
      const start = moment()
      const end = moment()
      filter.variable.start_date = start.subtract(1, 'minutes').format('YYYY-MM-DD HH:mm:ss')
      filter.variable.end_date = end.format('YYYY-MM-DD HH:mm:ss')

      myJson = await api_call()

      let values = []
      let times = []
      let i = 0
      Object.keys(myJson['tag']).forEach(function(key) {
        values = []
        times = []
        myJson['tag'][key].forEach(function(item) {
          values.push(item.value)
          times.push(item.time)
        })
        
        if(myChart.data.datasets.length < Object.keys(myJson['tag']).length) {
          myChart.data.datasets.push(
            {
              label: filter.initial,
              data: [],
              backgroundColor: 
                backgroudColors_list[i],
              borderColor: 
                borderColors_list[i],
              borderWidth: 1,
              tension: 0.1
            }
          )
        }
        myChart.options.tooltips = {
          callbacks: {
            label: (tooltipItem) => {
              return tooltipItem.yLabel + ' ' + filter.variable.unit
            }
          }
        }
        myChart.options.scales.yAxes[0].scaleLabel.labelString = filter.variable.unit
        myChart.data.datasets[i].data = values
        myChart.data.labels = times
        i = i + 1
      })

      myChart.update()
    }
    
    else if(myChart.data.datasets.length < 1) {
      if(status_api) {
        status_api = false
        myJson = await api_call()

        let values = []
        let times = []
        let i = 0
        Object.keys(myJson['tag']).forEach(function(key) {
          values = []
          times = []
          myJson['tag'][key].forEach(function(item) {
            values.push(item.value)
            times.push(item.time)
          })
          myChart.data.datasets.push(
            {
              label: filter.initial,
              data: [],
              backgroundColor: 
                backgroudColors_list[i],
              borderColor: 
                borderColors_list[i],
              borderWidth: 1,
              tension: 0.1
            }
          )
          myChart.options.tooltips = {
            callbacks: {
              label: (tooltipItem) => {
                return tooltipItem.yLabel + ' ' + filter.variable.unit
              }
            }
          }
          myChart.options.scales.yAxes[0].scaleLabel.labelString = filter.variable.unit
          myChart.data.datasets[i].data = values
          myChart.data.labels = times
          i = i + 1
        })

        myChart.update()
        
        status_api = true
      }
    }

  }
}, 1000)

/*
TODO LIST
  Colocar aviso de erro nos inputs de datas (utilizar Constraint validation para isso) e erro para data de fim menor que data de início
          CSS:
            input:invalid {
              background-color: #C00000;
              border-color: #C00000;
              border-width: 3px;
            }
            JS:
            document.getElementById(id).validity.rangeOverflow   (TRUE quando estiver fora do range)
  
  Melhorar visualização do gráfico com mais de uma linha (Alteração de cor)
  Adicionar legenda dinamica com os valores de cada ponto no gráfico

  Retirar linhas do código que estão sinalizadas por comentários
*/