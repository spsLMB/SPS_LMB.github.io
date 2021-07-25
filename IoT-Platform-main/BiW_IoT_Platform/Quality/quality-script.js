const chart_colors = [
    'rgba(4, 30, 66, 0.5)', //Scania Blue
    'rgba(214, 0, 28, 0.5)', //Scania Red
    'rgba(200, 201, 199, 0.5)', //Scania Light Grey
    'rgba(206, 184, 136, 0.5)', //Scania Beige
    'rgba(44, 82, 52, 0.5)', //Scania Green
    'rgba(227, 82, 5, 0.5)', //Scania Orange
    'rgba(68, 134, 145, 0.5)', //Scania Tertiary 01
    'rgba(225, 169, 62, 0.5)', //Scania Tertiary 04
    'rgba(148, 165, 150, 0.5)', //Scania Pale Green
    'rgba(0, 93, 109, 0.5)', //Scania Tertiary 03
    'rgba(137, 106, 115, 0.5)' //Scania Tertiary 05
]

//--------------------------------------Inicia Tabela-------------------------------------
$('#glue-table').DataTable({
    pagingType: "full_numbers",
    pageLength: 10,
    ordering: false,
    dom: '<"dt-buttons"Bf><"clear">lirtp',
    buttons: [
        'pdfHtml5',
    ],
    data: [],
    columns: ['', '', '', '', '', '', '', '', ''],
    autoWidth: false
})

//---------------------------------Variável de Filtro-----------------------------------------
const glue_filter = {
    line: {
        name: null,
        initial: null
    },
    status: null,
    stop: false,
    date: {
        start: null,
        end: null
    },
    popid: {
        selection: false,
        value: null
    },
    chart: {
        type: null,
        sort: null,
        page: false,
        range: 'hour'
    }
}

// --------------------------------- PopID Save ----------------------------------------------
function popid_save(input) {
    glue_filter.popid.value = input.value
    console.log(glue_filter.popid.value)
}


//----------------------------------Ranking buttons-------------------------------------------
function HideRanking() {
    let x = document.getElementById('right_side')
    let tabela = document.getElementById("div-glue-table")
    let hide_show = document.getElementById("hide_show")
    let startcalendar = document.getElementById("startdate")
    let endcalendar = document.getElementById("endate")
    let popid_selection = document.getElementById("popid_selection")
    let selections = document.querySelectorAll("#selection")
    if (x.style.display === "none") {
        x.style.display = "block"
        startcalendar.style.display = "block"
        endcalendar.style.display = "block"
        selections.forEach((selection)=>{
            selection.style.display = "inline-block"
        })
        tabela.style.marginTop = "0px"
        hide_show.value = "POPID"
        popid_selection.style.display = "none"
            // Reset variáveis 
        glue_filter.popid.selection = false
    } else {
        x.style.display = "none"
        tabela.style.marginTop = "150px"
        popid_selection.style.marginTop = "120px"
        startcalendar.style.display = "none"
        endcalendar.style.display = "none"
        selections.forEach((selection)=>{
            selection.style.display = "none"
        })
        hide_show.value = "DATE"
        popid_selection.style.display = "block"
        popid_selection.style.marginBottom = "17px"
            // Reset variáveis
        glue_filter.popid.selection = true
        document.getElementsByName('check').forEach((item) => {
            if (item.checked) {
                item.checked = false
            }
        })
    }

    glue_filter.date.start = null
    glue_filter.date.end = null
    document.getElementById('start_date_time').value = null
    document.getElementById('end_date_time').value = null
    document.getElementById('popid_selection').value = 'nenhum'
    console.log(glue_filter.popid.selection)
}


//----------------------------------- Process Option ---------------------------------------
function process_option(option) {
    //let option = document.getElementById("selection")
    let list_split = option.value.split('-')

    glue_filter.line.name = list_split[0]
    glue_filter.line.initial = list_split[1]

    console.log(glue_filter.line.name) //Teste (depois apagar)
    console.log(glue_filter.line.initial) //Teste (depois apagar)
    glue_filter.stop = false
}

function status_option(option){
    glue_filter.status = option.value
    console.log(glue_filter.status)
}

//----------------------------------- Chart Type Option ---------------------------------------
function chart_type(option) {
    let range_selector = document.getElementsByName('range_selection')[0]
    glue_filter.chart.type = option.value
    if (glue_filter.chart.type == 'polar') {
        range_selector.disabled = true
    }
    else if (glue_filter.chart.type == 'pareto') {
        range_selector.disabled = false
    }
    console.log(glue_filter.chart.type)
}

//------------------------------------- Chart Sort -----------------------------------------
function sort_chart(option) {
    glue_filter.chart.sort = option.value
    console.log(glue_filter.chart.sort)
}

//-------------------------------------- Range Option --------------------------------------
function option_range(option) {
    glue_filter.chart.range = option.value
    console.log(glue_filter.chart.range)
}

//----------------------------------- Checkbox Timeline ------------------------------------
function checkbox_timeline(checkbox) {
    let checkboxes = document.getElementsByName('check')
    document.getElementById('start_date_time').value = null
    document.getElementById('end_date_time').value = null

    checkboxes.forEach((item) => {
        if (item !== checkbox) {
            item.checked = false
        } else {
            const start_time = moment()
            const end_time = moment()

            glue_filter.date.start = null
            glue_filter.date.end = null
            glue_filter.date.realtime = false
            glue_filter.stop = false

            switch (item.value) {
                case 'day':
                    glue_filter.date.start = start_time.subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
                    glue_filter.date.end = end_time.format('YYYY-MM-DD HH:mm:ss')
                    console.log(glue_filter.date.start) //Teste (depois apagar)
                    console.log(glue_filter.date.end) //Teste (depois apagar)
                    break
                case 'week':
                    glue_filter.date.start = start_time.subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss')
                    glue_filter.date.end = end_time.format('YYYY-MM-DD HH:mm:ss')
                    console.log(glue_filter.date.start) //Teste (depois apagar)
                    console.log(glue_filter.date.end) //Teste (depois apagar)
                    break;
            }
            glue_filter.stop = false
            console.log(item.value) //Teste (depois apagar)
        }
    })
}

//----------------------------------------- CUSTOM DATE ------------------------------------------------------
function custom_date(datetime_input) {
    document.getElementsByName('check').forEach((item) => {
        if (item.checked) {
            glue_filter.date.start = null
            glue_filter.date.end = null
            glue_filter.date.realtime = false
            item.checked = false
        }
    })

    if (document.getElementById('start_date_time').value == '') {
        glue_filter.date.start = null
    } else if (document.getElementById('end_date_time').value == '') {
        glue_filter.date.end = null
    }

    if (datetime_input.id == 'start_date_time') {
        glue_filter.date.start = moment(datetime_input.value, moment.HTML5_FMT.DATETIME_LOCAL).format('YYYY-MM-DD HH:mm:ss')
        console.log(glue_filter.date.start) //Teste (depois apagar)
    } else if (datetime_input.id == 'end_date_time') {
        glue_filter.date.end = moment(datetime_input.value, moment.HTML5_FMT.DATETIME_LOCAL).format('YYYY-MM-DD HH:mm:ss')
        console.log(glue_filter.date.end) //Teste (depois apagar)
    }
    glue_filter.stop = false
}

//-------------------------------------------- TABLE GENERATORS --------------------------------------------
function historic_table_generator(api_data) {
    let table_dataset = []
    let table_columns = [
        { title: "Timestamp"},
        { title: "PopID" },
        { title: "Glue Status" },
        { title: "Manuf. Code" },
        { title: "Serial Number" },
        { title: "Operator Number" },
        { title: "Process" },
        { title: "Workcenter" },
        { title: "Temperature"}
    ]

    api_data.data.forEach((data) => {
        table_dataset.push([data.Timestamp, data.PopID, data.Event, data.ManufCode, data.SerialNumber, data.OperatorNumber, format_data.line_name(data.Line.Name, data.Line.Initial), data.Workcenter, data.Temperature])
    })

    $('#glue-table').DataTable({
        pagingType: "full_numbers",
        pageLength: 10,
        dom: '<"dt-buttons"Bf><"clear">lirtp',
        buttons: [
            'pdfHtml5',
        ],
        destroy: true,
        data: table_dataset,
        columns: table_columns,
        autoWidth: false
    })
}

//--------------------------------------- CHART GENERATOR ------------------------------------------------
function chart_generator(api_data){
    let labels, data, all_labels, obj_labels

    if (myChart){
        myChart.destroy()
    }

    all_labels = Object(api_data.data.map(item => item[glue_filter.chart.sort]))
    obj_labels = all_labels.reduce((acc, curr) => {
        if (curr in acc) {
            acc[curr]++
        }
        else {
            acc[curr] = 1
        }
        return acc
    }, {})

    labels = Object.keys(obj_labels)
    data = Object.values(obj_labels)

    if (glue_filter.chart.type == 'polar') {
        myChart = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Manufacturing Code',
                        data: data,
                        backgroundColor: chart_colors
                    }
                ]
            },
            options: {
                scale: {
                    ticks: {
                        precision: 0
                    }
                }
            }
        })
    }
    else if (glue_filter.chart.type == 'pareto') {
        const uniques = [...new Set(api_data.data.map(item => item[glue_filter.chart.sort]))]
        let chart_datasets = {}
        
        uniques.forEach((item) => {
            chart_datasets[item] = []
        })
        //console.log(chart_datasets)


        let chart_data = format_data.groupby_date_sort(api_data.data, glue_filter.chart.range, glue_filter.chart.sort)
        //console.log(chart_data)




        labels = []
        chart_data.forEach((item, index) => {
            labels.push(item.timestamp)
            delete item.count
            delete item.timestamp
            Object.keys(item).forEach((item2) => {
                chart_datasets[item2][index] = item[item2]
            })
        })
        console.log(chart_datasets)

        datasets = []
        Object.entries(chart_datasets).forEach((item, index) => {
            datasets.push(
                {
                    type: 'bar',
                    label: item[0],
                    data: item[1],
                    backgroundColor: chart_colors[index]
                }
            )
        })

        myChart = new Chart(ctx, {
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true
                    }
                },
                scale: {
                    ticks: {
                        precision: 0
                    }
                }
            }
        })
        console.log(labels)
    }
}
//--------------------------------------- DATA FORMAT ----------------------------------------------------
const format_data = {
    line_name: (name, initial) => {
        if (name == 'main_frame' || name == 'roof') {
            return name.replace('_', ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase())
                .concat(' ', initial.slice(-1))
        } else {
            return name.replace('_', ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase())
        }
    },
    duration_string: (duration_seconds) => {
        let duration = moment.duration(duration_seconds, 'seconds')
        if (Math.floor(duration.asDays()) != 0) {
            duration = Math.floor(duration.asDays().toString()) + ' days ' + duration.hours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + duration.minutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + duration.seconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        } else {
            duration = duration.hours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + duration.minutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + duration.seconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        }
        return duration
    },
    groupby_date_sort: (data_array, timeframe, sort) => {
        let obj = {}
        let datetime_atual, datetime_unix
        let return_array = []

        data_array.forEach((item) => {
            datetime_atual = moment(item.Timestamp, 'YYYY-MM-DD HH:mm:ss')
            datetime_unix = datetime_atual.startOf(timeframe).format('x')

        if (!(datetime_unix in obj)){
            obj[datetime_unix]= {
                count: 1, 
                timestamp: (() => {
                    if (timeframe == 'hour'){
                        return datetime_atual.startOf(timeframe).format('YYYY-MM-DD HH:mm:ss')
                    }
                    else if (timeframe == 'month'){
                        return datetime_atual.startOf(timeframe).format('YYYY-MM')
                    }
                    else {
                        return datetime_atual.startOf(timeframe).format('YYYY-MM-DD')
                    }
                })()
            }
            obj[datetime_unix][item[sort]] = 1
        }
        else {
            obj[datetime_unix].count++
            if (item[sort] in obj[datetime_unix]) {
                obj[datetime_unix][item[sort]]++
            }
            else {
                obj[datetime_unix][item[sort]] = 1
            }
        }
        })

        Object.keys(obj).sort().forEach((item) => {
            return_array.push(obj[item])
        })
        return return_array
    }
}

// ------------------------------------------------ API -----------------------------------------------
async function glue_hist_api() {
    let raw = null
    if (glue_filter.popid.selection){
        raw = {
            popID: glue_filter.popid.value
        }
    }
    else{
        raw = {
            line: {
                name: glue_filter.line.name,
                initial: glue_filter.line.initial
            },
            start_date: glue_filter.date.start,
            end_date: glue_filter.date.end,
            status: glue_filter.status
        }
    }

    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'text/plain')

    let settings = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw)
    }

    console.log(settings.body)

    const response = await fetch('http://10.251.1.132:8088/system/webdev/BiW_IoTPlatform/glue_report', settings)
    const myJson = await response.json()

    return myJson
}


// ------------------------------------------------ REFRESH -------------------------------------------
async function refresh_button_glue(button) {
    if (glue_filter.chart.page) {
        if (!button.classList.contains('btnRefresh_loading') && glue_filter.line.name && glue_filter.line.initial && glue_filter.date.start && glue_filter.date.end && glue_filter.chart.sort && glue_filter.chart.type && glue_filter.status) {
            button.classList.add('btnRefresh_loading')
            let myJson = await glue_hist_api()
            console.log(myJson)
            chart_generator(myJson)
            button.classList.remove('btnRefresh_loading')
        }
    }
    else {
        if (!button.classList.contains('btnRefresh_loading') && ((glue_filter.line.name && glue_filter.line.initial && glue_filter.date.start && glue_filter.date.end && glue_filter.status) || (glue_filter.popid.selection && glue_filter.popid.value))) {
            button.classList.add('btnRefresh_loading')
            let myJson = await glue_hist_api()
            console.log(myJson)
            historic_table_generator(myJson)
            button.classList.remove('btnRefresh_loading')
        }
    }
}

// ------------------------------------------------ GRÁFICO -------------------------------------------
var ctx = document.getElementById('myChart');
var config = {
    type: 'bar',
    data: {
        labels: [],
        datasets: []
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
}
var myChart = new Chart(ctx, config);

// ------------------------------------------------ GRÁFICO STACKED BAR -------------------------------------------
/* var ctx = document.getElementById('myChart2');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            title: {
              display: true
            },
          },
          responsive: true,
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
          }
    }
}); */



/*
datetimes = ["2021-07-21 05:46:50","2021-07-19 12:14:30", "2021-07-19 12:29:47", "2021-07-19 21:44:07", "2021-07-20 12:57:26", "2021-07-21 03:29:28", "2021-08-19 21:32:16", "2021-07-19 21:32:16"]
timeframe = 'month'

let obj = {}
let datetime_atual
let return_array = []

datetimes.forEach((item) => {
	datetime_atual = moment(item, 'YYYY-MM-DD HH:mm:ss')
  if (!(datetime_atual.startOf(timeframe).format('x') in obj)){
  	obj[datetime_atual.startOf(timeframe).format('x')]= {
    	count: 1, 
      timestamp: (() => {
      	if (timeframe == 'hour'){
        	return datetime_atual.startOf(timeframe).format('YYYY-MM-DD HH:mm:ss')
        }
        else if (timeframe == 'month'){
        	return datetime_atual.startOf(timeframe).format('YYYY-MM')
        }
        else {
        	return datetime_atual.startOf(timeframe).format('YYYY-MM-DD')
        }
      })()
    }
  }
  else {
  	obj[datetime_atual.startOf(timeframe).format('x')].count++
  }
})

Object.keys(obj).sort().forEach((item) => {
	return_array.push(obj[item])
})
return return_array

console.log(chartData)
*/