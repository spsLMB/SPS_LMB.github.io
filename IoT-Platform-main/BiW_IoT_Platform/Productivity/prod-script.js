//--------------------------------------Inicia Tabela-------------------------------------
$('#alarm-table').DataTable({
    pagingType: "full_numbers",
    pageLength: 10,
    ordering: false,
    dom: '<"dt-buttons"Bf><"clear">lirtp',
    buttons: [
        'pdfHtml5',
    ],
    data: [],
    columns: ['', '', '', '', '', '', '', '', '', '']
})

//--------------------------------------Local Filter--------------------------------------
const alarm_filter = {
    line: {
        name: null,
        initial: null
    },
    type: [],
    stop: false,
    date: {
        realtime: false,
        start: null,
        end: null
    },
    ranking: {
        selection: false,
        top: null,
        sort: null
    },
    profinet: {
        tags: () => {
            return ['[default]'.concat(alarm_filter.line.name, '/Profinet/', alarm_filter.line.initial, '/', 'ProfinetNetwork')]
        }
    }
}

//------------------------------------Toggle Types----------------------------------------
function toggle_alarms_types(toggle) {
    if (toggle.checked) {
        alarm_filter.type.push(toggle.value)
    } else {
        alarm_filter.type.splice(alarm_filter.type.indexOf(toggle.value), 1)
    }
    console.log(alarm_filter.type) //Teste (depois apagar)
    alarm_filter.stop = false
}

//----------------------------------Ranking buttons-------------------------------------------
function HideRanking() {
    let x = document.getElementById('right_side')
    let tabela = document.getElementById("div-alarm-table")
    let hide_show = document.getElementById("hide_show")
    let rank_selection = document.getElementById("rank_selection")
    let frequency_selection = document.getElementById("frequency_selection")
    let ranking_title = document.getElementById("ranking_hide_title")
    if (x.style.display === "none") {
        x.style.display = "block"
        tabela.style.marginTop = "0px"
        hide_show.value = "SHOW"
        rank_selection.style.display = "none"
        frequency_selection.style.display = "none"
            // Reset variáveis 
        alarm_filter.ranking.selection = false
        alarm_filter.ranking.sort = null
        alarm_filter.ranking.top = null
    } else {
        x.style.display = "none"
        tabela.style.marginTop = "0px"
        hide_show.value = "HIDE"
        rank_selection.style.display = "block"
        rank_selection.style.marginBottom = "17px"
        frequency_selection.style.display = "block"
        frequency_selection.style.marginBottom = "17px"
            // Reset variáveis
        alarm_filter.ranking.selection = true
        document.getElementsByName('check').forEach((item) => {
            if (item.checked) {
                item.checked = false
            }
        })
    }

    alarm_filter.date.start = null
    alarm_filter.date.end = null
    alarm_filter.date.realtime = false
    document.getElementById('start_date_time').value = null
    document.getElementById('end_date_time').value = null
    document.getElementById('frequency_selection').value = 'nenhum'
    document.getElementById('rank_selection').value = 'nenhum'
}
/*
function CriaPDF() {
    var minhaTabela = document.getElementById('alarm-table').innerHTML;
    var style = "<style>";
    style = style + "table th, td{padding:10px 18px 6px 18px;border-top:1px solid #111;}";
    style = style + "table{background-color:whitesmoke;}";
    style = style + "table{width:100%;margin:0 auto;ear:both;border-collapse:separate;border-spacing:0;";
    style = style + ".dataTables_wrapper .dataTables_length select{border:1px solid #aaa;border-radius:3px;padding:5px;background-color:transparent;padding:4px}";
    style = style + "</style>";
    // CRIA UM OBJETO WINDOW
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head>');
    win.document.write('<title>Alarm Ranking</title>');   // <title> CABEÇALHO DO PDF.
    win.document.write(style);                                     // INCLUI UM ESTILO NA TAB HEAD
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(minhaTabela);                          // O CONTEUDO DA TABELA DENTRO DA TAG BODY
    win.document.write('</body></html>');
    win.document.close(); 	                                         // FECHA A JANELA
    win.print();                                                            // IMPRIME O CONTEUDO
}
*/

//-----------------------------------Ranking option--------------------------------------
function ranking_option(option) {
    if (option.id == 'rank_selection') {
        alarm_filter.ranking.top = parseInt(option.value)
        console.log(alarm_filter.ranking.top) //Teste (depois apagar)
    } else if (option.id == 'frequency_selection') {
        alarm_filter.ranking.sort = option.value
        console.log(alarm_filter.ranking.sort) //Teste (depois apagar)
    }
    alarm_filter.stop = false
}

//-----------------------------------Process Option---------------------------------------
function process_option(option) {
    //let option = document.getElementById("selection")
    let list_split = option.value.split('-')

    alarm_filter.line.name = list_split[0]
    alarm_filter.line.initial = list_split[1]

    console.log(alarm_filter.line.name) //Teste (depois apagar)
    console.log(alarm_filter.line.initial) //Teste (depois apagar)
    alarm_filter.stop = false
}

//-----------------------------------Checkbox Timeline------------------------------------
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

            alarm_filter.date.start = null
            alarm_filter.date.end = null
            alarm_filter.date.realtime = false
            alarm_filter.stop = false

            switch (item.value) {
                case 'currentalarm':
                    alarm_filter.date.realtime = true
                    break
                case 'hour':
                    alarm_filter.date.start = start_time.subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss')
                    alarm_filter.date.end = end_time.format('YYYY-MM-DD HH:mm:ss')
                    console.log(alarm_filter.date.start) //Teste (depois apagar)
                    console.log(alarm_filter.date.end) //Teste (depois apagar)
                    break
                case 'day':
                    alarm_filter.date.start = start_time.subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
                    alarm_filter.date.end = end_time.format('YYYY-MM-DD HH:mm:ss')
                    console.log(alarm_filter.date.start) //Teste (depois apagar)
                    console.log(alarm_filter.date.end) //Teste (depois apagar)
                    break
                case 'week':
                    alarm_filter.date.start = start_time.subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss')
                    alarm_filter.date.end = end_time.format('YYYY-MM-DD HH:mm:ss')
                    console.log(alarm_filter.date.start) //Teste (depois apagar)
                    console.log(alarm_filter.date.end) //Teste (depois apagar)
                    break;
            }
            alarm_filter.stop = false
            console.log(item.value) //Teste (depois apagar)
        }
    })
}

//---------------------------------------Custom date-----------------------------------------------------------
function custom_date(datetime_input) {
    document.getElementsByName('check').forEach((item) => {
        if (item.checked) {
            alarm_filter.date.start = null
            alarm_filter.date.end = null
            alarm_filter.date.realtime = false
            item.checked = false
        }
    })

    if (document.getElementById('start_date_time').value == '') {
        alarm_filter.date.start = null
    } else if (document.getElementById('end_date_time').value == '') {
        alarm_filter.date.end = null
    }

    if (datetime_input.id == 'start_date_time') {
        alarm_filter.date.start = moment(datetime_input.value, moment.HTML5_FMT.DATETIME_LOCAL).format('YYYY-MM-DD HH:mm:ss')
        console.log(alarm_filter.date.start) //Teste (depois apagar)
    } else if (datetime_input.id == 'end_date_time') {
        alarm_filter.date.end = moment(datetime_input.value, moment.HTML5_FMT.DATETIME_LOCAL).format('YYYY-MM-DD HH:mm:ss')
        console.log(alarm_filter.date.end) //Teste (depois apagar)
    }
    alarm_filter.stop = false
}

//--------------------------------------------Table Generators-------------------------------------------------------------------
function historic_table_generator(api_data) {
    let table_dataset = []
    let table_columns = [
        { title: "Type" },
        { title: "Process" },
        { title: "State" },
        { title: "Mode Zone" },
        { title: "Equipment" },
        { title: "Description 1" },
        { title: "Description 2" },
        { title: "Timestamp" },
        { title: "Duration", visible: false },
        { title: "Duration in seconds", visible: false }
    ]

    api_data.data.forEach((data) => {
        table_dataset.push([data.alarm_type, format_data.line_name(data.line, data.line_initial), data.eventState, data.zone, data.equipment, data.description_1, data.description_2, data.eventTime, '', ''])
    })

    $('#alarm-table').DataTable({
        pagingType: "full_numbers",
        pageLength: 10,
        dom: '<"dt-buttons"Bf><"clear">lirtp',
        buttons: [
            'pdfHtml5',
        ],
        destroy: true,
        data: table_dataset,
        columns: table_columns
    })
}

function current_table_generator(api_data) {
    let table_dataset = []
    let table_columns = [
        { title: "Type" },
        { title: "Process" },
        { title: "State" },
        { title: "Mode Zone" },
        { title: "Equipment" },
        { title: "Description 1" },
        { title: "Description 2" },
        { title: "Timestamp" },
        { title: "Duration", orderData: 9 },
        { title: "Duration in seconds", visible: false }
    ]

    api_data.data.forEach((data) => {
        table_dataset.push([data.alarm_type, format_data.line_name(data.line, data.line_initial), data.eventState, data.zone, data.equipment, data.description_1, data.description_2, data.eventTime, format_data.duration_string(data.duration), data.duration])
    })

    $('#alarm-table').DataTable({
        pagingType: "full_numbers",
        pageLength: 10,
        dom: '<"dt-buttons"Bf><"clear">lirtp',
        buttons: [
            'pdfHtml5',
        ],
        destroy: true,
        data: table_dataset,
        columns: table_columns
    })
}

function ranking_table_generator(api_data) {
    if (alarm_filter.ranking.sort == 'frequency') {
        let table_dataset = []
        let table_columns = [
            { title: "Type" },
            { title: "Process" },
            { title: "Mode Zone" },
            { title: "Equipment" },
            { title: "Description 1" },
            { title: "Description 2" },
            { title: "Frequency" },
            { title: "Total Duration", orderData: 8 },
            { title: "Duration in seconds", visible: false },
            { title: "", visible: false }
        ]

        api_data.data.forEach((data) => {
            table_dataset.push([data.alarm_type, format_data.line_name(data.line, data.line_initial), data.zone, data.equipment, data.description_1, data.description_2, data.frequency, format_data.duration_string(data.duration), data.duration, ''])
        })


        $('#alarm-table').DataTable({
            pagingType: "full_numbers",
            pageLength: 10,
            dom: '<"dt-buttons"Bf><"clear">lirtp',
            buttons: [
                'pdfHtml5',
            ],
            order: [
                [6, "desc"]
            ],
            destroy: true,
            data: table_dataset,
            columns: table_columns
        })
    } else {
        let table_dataset = []
        let table_columns = [
            { title: "Type" },
            { title: "Process" },
            { title: "Mode Zone" },
            { title: "Equipment" },
            { title: "Description 1" },
            { title: "Description 2" },
            { title: "Duration", orderData: 7 },
            { title: "Duration in seconds", visible: false },
            { title: "Frequency", visible: false },
            { title: "State", visible: false }
        ]

        api_data.data.forEach((data) => {
            table_dataset.push([data.alarm_type, format_data.line_name(data.line, data.line_initial), data.zone, data.equipment, data.description_1, data.description_2, format_data.duration_string(data.duration), data.duration, '', ''])
        })

        $('#alarm-table').DataTable({
            pagingType: "full_numbers",
            pageLength: 10,
            dom: '<"dt-buttons"Bf><"clear">lirtp',
            buttons: [
                'pdfHtml5',
            ],
            order: [
                [6, "desc"]
            ],
            destroy: true,
            data: table_dataset,
            columns: table_columns
        })
    }
}

function profinet_table_generator(api_data) {
    let table_dataset = []
    let table_columns = [
        { title: "ProfinetName" },
        { title: "IP" },
        { title: "WithoutError" },
        { title: "DeviceFaulty" },
        { title: "MaintenaceDemand" },
        { title: "Disabled" },
        { title: "Timestamp" },
        { title: "Total Duration", visible: false },
        { title: "State", visible: false },
        { title: "Duration", visible: false }
    ]

    api_data.tags[0].data.forEach((data) => {

        table_dataset.push([data.ProfinetName, data.IP, data.WithoutError, data.DeviceFaulty, data.MaintenaceDemand, data.Disabled, api_data.tags[0].time, '', '', ''])
    })


    $('#alarm-table').DataTable({
        pagingType: "full_numbers",
        pageLength: 10,
        dom: '<"dt-buttons"Bf><"clear">lirtp',
        buttons: [
            'pdfHtml5',
        ],
        destroy: true,
        data: table_dataset,
        columns: table_columns
    })
}

//----------------------------------------Data Format-----------------------------------------------------------------------
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
    }
}



//----------------------------------------Alarm APIs------------------------------------------------------------------------
let status_api = true

async function alarm_hist_api() {
    //document.getElementById('loader').style.display = 'block'
    let raw = {
        "alarm_type": alarm_filter.type,
        "line": alarm_filter.line.name,
        "line_initial": alarm_filter.line.initial,
        "start_date": alarm_filter.date.start,
        "end_date": alarm_filter.date.end
    }

    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'text/plain')

    let settings = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw)
    }

    console.log(settings.body)

    const response = await fetch('http://10.251.1.132:8088/system/webdev/BiW_IoTPlatform/alarm_journal', settings)
    const myJson = await response.json()

    //document.getElementById('loader').style.display = 'none'

    return myJson
}

async function current_alarm_api() {
    //document.getElementById('loader').style.display = 'block'
    let raw = {
        "alarm_type": alarm_filter.type,
        "line": alarm_filter.line.name,
        "line_initial": alarm_filter.line.initial
    }

    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'text/plain')

    let settings = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw)
    }

    console.log(settings.body)

    const response = await fetch('http://10.251.1.132:8088/system/webdev/BiW_IoTPlatform/alarm_status', settings)
    const myJson = await response.json()

    //document.getElementById('loader').style.display = 'none'

    return myJson
}

async function alarm_ranking_api() {
    //document.getElementById('loader').style.display = 'block'
    let raw = {
        "alarm_type": alarm_filter.type,
        "line": alarm_filter.line.name,
        "line_initial": alarm_filter.line.initial,
        "start_date": alarm_filter.date.start,
        "end_date": alarm_filter.date.end,
        "ranking": alarm_filter.ranking.sort,
        "count": alarm_filter.ranking.top
    }

    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'text/plain')

    let settings = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw)
    }

    console.log(settings.body)

    const response = await fetch('http://10.251.1.132:8088/system/webdev/BiW_IoTPlatform/alarm_ranking', settings)
    const myJson = await response.json()

    //document.getElementById('loader').style.display = 'none'

    return myJson
}

async function profinet_api() {
    let raw = {
        "tags": alarm_filter.profinet.tags()
    }

    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'text/plain')

    let settings = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw)
    }

    console.log(settings.body)

    const response = await fetch('http://10.251.1.132:8088/system/webdev/BiW_IoTPlatform/profinet_status', settings)
    const myJson = await response.json()

    //document.getElementById('loader').style.display = 'none'

    return myJson
}

//--------------------------------------------Call API------------------------------------------------------------------
/*
setInterval(async function() {
    if(status_api && alarm_filter.line.name && alarm_filter.line.initial && alarm_filter.type.length>0 && !alarm_filter.stop && (alarm_filter.date.realtime || (alarm_filter.date.start && alarm_filter.date.end))) {
        if(alarm_filter.ranking.top != null && alarm_filter.ranking.sort != null && alarm_filter.ranking.selection) {
			status_api = false
			let myJson = await  alarm_ranking_api()
			alarm_filter.stop = true
			status_api = true
			console.log(myJson)
			ranking_table_generator(myJson)
		}
		else if(alarm_filter.date.realtime && !alarm_filter.ranking.selection) {
            status_api = false
            let myJson = await current_alarm_api()
            alarm_filter.stop = true
            status_api = true
            console.log(myJson)
            current_table_generator(myJson)
        }
		else if(!alarm_filter.ranking.selection) {
            status_api = false
            let myJson = await alarm_hist_api()
            alarm_filter.stop = true
            status_api = true
            console.log(myJson)
            historic_table_generator(myJson)
        }
    }
},1000)
*/

async function refresh_button_alarm(button) {
    if (!button.classList.contains('btnRefresh_loading') && alarm_filter.line.name && alarm_filter.line.initial && alarm_filter.type.length > 0 && (alarm_filter.date.realtime || (alarm_filter.date.start && alarm_filter.date.end))) {
        if (alarm_filter.ranking.top != null && alarm_filter.ranking.sort != null && alarm_filter.ranking.selection) {
            //status_api = false
            button.classList.add('btnRefresh_loading')
            let myJson = await alarm_ranking_api()
                //alarm_filter.stop = true
                //status_api = true
            console.log(myJson)
            ranking_table_generator(myJson)
        } else if (alarm_filter.date.realtime && !alarm_filter.ranking.selection) {
            //status_api = false
            button.classList.add('btnRefresh_loading')
            let myJson = await current_alarm_api()
                //alarm_filter.stop = true
                //status_api = true
            console.log(myJson)
            current_table_generator(myJson)
        } else if (!alarm_filter.ranking.selection) {
            //status_api = false
            button.classList.add('btnRefresh_loading')
            let myJson = await alarm_hist_api()
                //alarm_filter.stop = true
                //status_api = true
            console.log(myJson)
            historic_table_generator(myJson)
        }
        button.classList.remove('btnRefresh_loading')
    }
}

async function refresh_button_profinet(button) {
    if (!button.classList.contains('btnRefresh_loading') && alarm_filter.line.name && alarm_filter.line.initial && alarm_filter.date.realtime) {
        button.classList.add('btnRefresh_loading')
        let myJson = await profinet_api()
        console.log(myJson)
        profinet_table_generator(myJson)
    }
    button.classList.remove('btnRefresh_loading')
}