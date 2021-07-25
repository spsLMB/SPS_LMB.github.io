const chart_colors = ['rgba(4,30,66, 1)', 'rgba(151, 153, 155, 1)']

// -------------------------------- CHART PLOT -----------------------------------
function chart_plot() {
    let myChart = new Chart(ctx, {
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
    return myChart
}

// -------------------------------- CHART PLOT -----------------------------------
async function api_call(local_filter){
  let raw = {"tag": []}

  console.log(local_filter.variable.path) //Teste (depois apagar)
  
  local_filter.variable.path().forEach(function(path_index){
    raw.tag.push(
      {
        "path": path_index,
        "start_date": local_filter.variable.date.start,
        "end_date": local_filter.variable.date.end,
        "interval_hours": local_filter.variable.date.interval.hours,
        "interval_minutes": local_filter.variable.date.interval.minutes,
        "interval_seconds": local_filter.variable.date.interval.seconds
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