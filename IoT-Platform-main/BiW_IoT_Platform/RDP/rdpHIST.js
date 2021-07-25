//Constantes inínio e fim de turnos
const startT1 = moment('07:00:00', 'hh:mm:ss')
const endT1 = moment('15:59:59', 'hh:mm:ss')
const startT2 = moment('16:00:00', 'hh:mm:ss')
const endT2 = moment('23:59:59', 'hh:mm:ss')
const startT3 = moment('00:00:00', 'hh:mm:ss')
const endT3 = moment('06:59:59', 'hh:mm:ss')

//Constante de filtro zerada
const filter = {
    line: null,
    initial: null,
    turno: [],
    stop: false,
    edit: 0,
    date: {
        start: null,
        end: null
    }
}

//Função para seleção de processo no filtro de dropdown
function processOption(option){
    let list_split = option.value.split('-')
    filter.line = list_split[0]
    filter.initial = list_split[1]
    filter.stop = false
    console.log(filter.line)
    console.log(filter.initial)
}

/* //Função para seleção de turno no filtro de toogle
function toggleTurno(toggle){
    if (toggle.checked) {
        filter.turno.push(toggle.value)
    } else {
        filter.turno.splice(filter.turno.indexOf(toggle.value), 1)
    }
    filter.stop = false
} */

/* //Toggle de turno pré selecionado de acordo comm horário atual e condições para seleção
(function autoTurno(){
    const now = moment()
    if (now.isSame(startT1) || now.isSame(endT1) || now.isBetween(startT1, endT1)){
        filter.turno.push('1')
        document.getElementById('turno1').disabled = false
        document.getElementById('turno2').disabled = true
        document.getElementById('turno3').disabled = true
        document.getElementById('turno1').checked = true
    }
    else if (now.isSame(startT2) || now.isSame(endT2) || now.isBetween(startT2, endT2)) {
        filter.turno.push('2')
        document.getElementById('turno2').disabled = false
        document.getElementById('turno1').disabled = false
        document.getElementById('turno3').disabled = true
        document.getElementById('turno2').checked = true
    }
    else if (now.isSame(startT3) || now.isSame(endT3) || now.isBetween(startT3, endT3)) {
        filter.turno.push('3')
        document.getElementById('turno3').disabled = false
        document.getElementById('turno1').disabled = true
        document.getElementById('turno2').disabled = false
        document.getElementById('turno3').checked = true
    }
})() */

//Inicialização da tabela
var tableVar

tableVar = $('#histRDP-table').DataTable({
    pagingType: "full_numbers",
    pageLength: 20,
    ordering: false,
    dom: 'frBtip',
    buttons: {
        buttons: [
            { extend: 'excel', className: "excelButton" },
        ],
    },
    data: [],
    columns: ['', '', '', '', '', '', '', '', '', '', '', '',''],
    autoWidth: false
})

$('#histRDP-table').append('<tfoot> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th>Total</th> <th>0</th> <th></th> <th></th> <th></th> <th></th></tfoot>')

//Tratamento de segundos para formato hh:mm:ss + tipos de situação por número correspondente
const formatData = {
    duration_string: (duration_seconds) => {
        let duration = moment.duration(duration_seconds, 'seconds')
        if (Math.floor(duration.asDays()) != 0) {
            duration = Math.floor(duration.asDays().toString()) + ' days ' + duration.hours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + duration.minutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + duration.seconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        } else {
            duration = duration.hours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + duration.minutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + duration.seconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        }
        return duration
    },
    laborStatus_string: (laborNum) => {
        if(laborNum == 1){
            return 'Parado(Stopped)'
        }
        if (laborNum == 2) {
            return 'Atrasado(Starved)'
        }
        if (laborNum == 3) {
            return 'Bloqueado(Blocked)'
        }
        if (laborNum == 4) {
            return 'Inativo(Idle)'
        }
        if (laborNum == 6) {
            return 'Aguardando(Waiting)'
        }
        else {
            return 'Normal(Running)'
        }
    },
    line_name: (name, initial) => {
        return name.replace('_', ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase())
    },
}    

//Chamada API - dados para tabela de acordo com filtro de turno
async function API(){
    body = {
        line: {
            name: filter.line,
            initial: filter.initial
        },
        start_date: filter.date.start,
        end_date: filter.date.end
    }
    
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'text/plain')
    let settings = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body)
    }
    const response = await fetch("http://10.251.1.132:8088/system/webdev/BiW_IoTPlatform/typestation", settings)
    myJSONGlobal = await response.json()
    console.log(myJSONGlobal)
    return myJSONGlobal
}

//Variável global com dados recebidos da API
var myJSONGlobal = null;

//Função para gerar tabela e pop-up com dados
async function table_generator(apiData){
    let myJSON = apiData
    let dataset = []
    let columns = [
        { title: "Data/Hora de Início", data: "startDate"},
        { title: "Data/Hora de Fim", data: "endDate" },
        { title: "Workcenter", data: "line" },
        { title: "PopID" , data: "popID"},
        { title: "Estação", data: "stationName"},
        { title: "Grupo", data: "grupo"},
        { title: "Desvio", data: "desvio"},
        { title: "Alarme", data: "alarme", className: 'Pop-up'},
        { title: "Interferência", data: "interferencia"},
        { title: "Situação", data: "situacao"},
        { title: "Responsável", data: "responsavel"},
        { title: "Comentários Relevantes", data: "comentario"},
        { title: "Index", data: "Index", visible:false}
    ]

    myJSON.data.forEach(function(data, index){
        let laborStatus = 0
        data.laborStatus.forEach(function(status){
            if(laborStatus == 0){
                laborStatus = status
            }
            else if(status<laborStatus){
                laborStatus = status
            }
        })
        let desvio = ''
        if (Object.keys(data.reasons).includes('daski') && Object.keys(data.reasons).includes('alarms')){
            desvio = 'Daski, Alarms'
        }
        else if (Object.keys(data.reasons).includes('daski')){
            desvio = 'Daski'
        }
        else if (Object.keys(data.reasons).includes('alarms')) {
            desvio = 'Alarms'
        }
        dataset.push({ startDate: data.LastTimestamp, endDate: data.timestamp, line: formatData.line_name(filter.line), popID: data.PopID, stationName: data.StationName, grupo: "", desvio: data.desvio, alarme: desvio, interferencia: formatData.duration_string(data.interference), situacao: formatData.laborStatus_string(laborStatus), responsavel: data.responsavel, comentario: data.comentarios, Index: index })
    })

    tableVar = $('#histRDP-table').DataTable({
        pagingType: "full_numbers",
        pageLength: 20,
        destroy: true,
        data: dataset,
        columns: columns,
        order: [[0,'desc']],
        dom: 'frBtip',
        buttons: {
            buttons: [
                {extend: 'excel', className: "excelButton"},
            ],
        },
        autoWidth: false        
    })

    let footer = document.getElementsByTagName('tfoot')
    footer[0].childNodes[1].childNodes[8].innerHTML = formatData.duration_string(apiData.total_duration)
    console.log(footer[0].childNodes[1].childNodes[8].innerHTML)

    $('#histRDP-table').on('click', '.Pop-up', function(){
        tablePopup(tableVar.row(this).data(), myJSON)
    })
}

//Função para pop-up da tabela
function tablePopup(celula, json){
    if (Object.keys(json.data[celula.Index].reasons).includes('daski') && Object.keys(json.data[celula.Index].reasons).includes('alarms')) {
        let startDaski = moment(json.data[celula.Index].reasons.daski.startTime, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss")
        let endDaski = moment(json.data[celula.Index].reasons.daski.endTime, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss")
        let durationDaski = formatData.duration_string(json.data[celula.Index].reasons.daski.duration)

        Swal.fire({
            html: `<h1> Alarmes </h1> <table id="popUp-table" class="table table-striped table-clickable table-panel"></table> <br> <h1> Daski </h1> <p> <b>Início:</b> ` + startDaski + ` | <b>Término:</b> ` + endDaski + ` | <b>Duração:</b> ` + durationDaski + ` </p>`,
            showConfirmButton: false,
            customClass: 'tablePopup'
        })

        let columns = [
            { title: "Type", data: "alarmType" },
            { title: "Mode Zone", data: "alarmZone" },
            { title: "Equipment", data: "alarmEquipment" },
            { title: "Description 1", data: "alarmDesc1" },
            { title: "Description 2", data: "alarmDesc2" },
        ]
        let data = []
        json.data[celula.Index].reasons.alarms.forEach(function (item) {
            data.push({ alarmType: item.alarm_type, alarmZone: item.zone, alarmEquipment: item.equipment, alarmDesc1: item.description_1, alarmDesc2: item.description_2 })
        })
        $('#popUp-table').DataTable({
            pagingType: "full_numbers",
            pageLength: 10,
            ordering: false,
            dom: '<"dt-buttons"Bf><"clear">lirtp',
            data: data,
            columns: columns,
            searching: false,
            paging: false,
            info: false,
            buttons: {
                buttons: [
                ],
            }
        })
    }
    else if (Object.keys(json.data[celula.Index].reasons).includes('daski')) {
        let startDaski = moment(json.data[celula.Index].reasons.daski.startTime, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss")
        let endDaski = moment(json.data[celula.Index].reasons.daski.endTime, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss")
        let durationDaski = formatData.duration_string(json.data[celula.Index].reasons.daski.duration)

        Swal.fire({
            html: `<h1> Daski </h1> <p> <b>Início:</b> ` + startDaski + ` | <b>Término:</b> ` + endDaski + ` | <b>Duração:</b> ` + durationDaski + ` </p> `,
            showConfirmButton: false,
            customClass: 'tablePopup'
        })
    }
    else if (Object.keys(json.data[celula.Index].reasons).includes('alarms')) {
        Swal.fire({
            html: `<h1> Alarmes </h1> <table id="popUp-table" class="table table-striped table-clickable table-panel"></table>`,
            showConfirmButton: false,
            customClass: 'tablePopup'
        })

        let columns = [
            { title: "Type", data: "alarmType" },
            { title: "Mode Zone", data: "alarmZone" },
            { title: "Equipment", data: "alarmEquipment" },
            { title: "Description 1", data: "alarmDesc1" },
            { title: "Description 2", data: "alarmDesc2" },
        ]
        let data = []
        json.data[celula.Index].reasons.alarms.forEach(function (item) {
            data.push({ alarmType: item.alarm_type, alarmZone: item.zone, alarmEquipment: item.equipment, alarmDesc1: item.description_1, alarmDesc2: item.description_2 })
        })
        $('#popUp-table').DataTable({
            pagingType: "full_numbers",
            pageLength: 10,
            ordering: false,
            dom: '<"dt-buttons"Bf><"clear">lirtp',
            data: data,
            columns: columns,
            searching: false,
            paging: false,
            info: false,
            buttons: {
                buttons: [
                ],
            }
        })
    }
}

//Função para atualizar dados de acordo com hora atual, respeitando preenchimento de campos da tabela
async function pageRefresh(){
    if (filter.line != null && filter.date.start != null && filter.date.end != null) {
        let myJSON = await API()
        table_generator(myJSON)
        document.getElementsByClassName("btnRefresh")[0].classList.remove("btnRefresh_loading")
    }
}

//Atualização das informações filtradas a cada 1s
setInterval(function (){
    if(!filter.stop){
        pageRefresh()
        filter.stop = true
    }
},1000)

//Função para botão Refresh
function btnRefresh(button){
    if(!button.classList.contains("btnRefresh_loading")){
        button.classList.add("btnRefresh_loading")
        pageRefresh()
    }
}

function custom_date(datetime_input) {
    document.getElementsByName('check').forEach((item) => {
        if (item.checked) {
            filter.date.start = null
            filter.date.end = null
            item.checked = false
        }
    })
    if (document.getElementById('start_date_time').value == '') {
        filter.date.start = null
    } else if (document.getElementById('end_date_time').value == '') {
        filter.date.end = null
    }
    if (datetime_input.id == 'start_date_time') {
        filter.date.start = moment(datetime_input.value, moment.HTML5_FMT.DATETIME_LOCAL).format('YYYY-MM-DD HH:mm:ss')
        console.log(filter.date.start) //Teste (depois apagar)
    } else if (datetime_input.id == 'end_date_time') {
        filter.date.end = moment(datetime_input.value, moment.HTML5_FMT.DATETIME_LOCAL).format('YYYY-MM-DD HH:mm:ss')
        console.log(filter.date.end) //Teste (depois apagar)
    }
    filter.stop = false
}

// Função dos Checkbox
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

            filter.date.start = null
            filter.date.end = null
            filter.date.realtime = false
            filter.stop = false

            switch (item.value) {
                case 'current':
                    if (start_time.isBefore(start_time.hour(7).minute(0).second(0))) {
                        filter.date.start = start_time.hour(7).minute(0).second(0).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
                        filter.date.end = end_time.hour(6).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss')
                    }
                    else {
                        filter.date.start = start_time.hour(7).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss')
                        filter.date.end = end_time.hour(6).minute(59).second(59).add(1, 'day').format('YYYY-MM-DD HH:mm:ss')
                    }
                    console.log(filter.date.start) //Teste (depois apagar)
                    console.log(filter.date.end) //Teste (depois apagar)
                    break
                case 'month':
                    filter.date.start = start_time.subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss')
                    filter.date.end = end_time.format('YYYY-MM-DD HH:mm:ss')
                    console.log(filter.date.start) //Teste (depois apagar)
                    console.log(filter.date.end) //Teste (depois apagar)
                    break
                case 'day':
                    if (start_time.isBefore(start_time.hour(7).minute(0).second(0))){
                        filter.date.start = start_time.hour(7).minute(0).second(0).subtract(2, 'day').format('YYYY-MM-DD HH:mm:ss')
                        filter.date.end = end_time.hour(6).minute(59).second(59).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
                    }
                    else{
                        filter.date.start = start_time.hour(7).minute(0).second(0).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
                        filter.date.end = end_time.hour(6).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss')
                    }
                    console.log(filter.date.start) //Teste (depois apagar)
                    console.log(filter.date.end) //Teste (depois apagar)
                    break
                case 'week':
                    filter.date.start = start_time.subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss')
                    filter.date.end = end_time.format('YYYY-MM-DD HH:mm:ss')
                    console.log(filter.date.start) //Teste (depois apagar)
                    console.log(filter.date.end) //Teste (depois apagar)
                    break;
            }
            filter.stop = false
            console.log(item.value) //Teste (depois apagar)
        }
    })
}