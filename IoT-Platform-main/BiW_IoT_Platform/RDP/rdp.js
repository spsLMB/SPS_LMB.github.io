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
}

//Função para seleção de turno no filtro de toogle
function toggleTurno(toggle){
    if (toggle.checked) {
        filter.turno.push(toggle.value)
    } else {
        filter.turno.splice(filter.turno.indexOf(toggle.value), 1)
    }
    filter.stop = false
}

//Toggle de turno pré selecionado de acordo comm horário atual e condições para seleção
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
})()

//Inicialização da tabela
$('#alarm-table').DataTable({
    pagingType: "full_numbers",
    pageLength: 10,
    ordering: false,
    dom: '<"dt-buttons"Bf><"clear">lirtp',
    data: [],
    columns: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    autoWidth: false
})

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

//Chamada API - dados para gráfico de barras
async function apiBarChart(){
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'text/plain')
    let settings = {
        method: 'POST',
        headers: myHeaders
    }
    const response = await fetch("http://10.251.1.132:8088/system/webdev/BiW_IoTPlatform/PopID_list", settings)
    const myJSON = await response.json()
    console.log(myJSON.data.length)
    return myJSON
}

//Constantes do gráfico de barras
const labels = [];
const data = {
    labels: labels,
    datasets: [{
        backgroundColor: 'rgba(4, 30, 66,1)',
        borderColor: 'rgb(4, 30, 66)',
        data: [],
        order: 2
    },
    {
        backgroundColor: 'rgba(214, 0, 28,1)',
        borderColor: 'rgb(214, 0, 28)',
        borderWidth: 2,
        data: [],
        type: "line",
        order: 1
    }]
};

//Função update de dados gráfico de barras
async function dataBarChart(){
    myChart.data.labels=[]
    myChart.data.datasets[0].data=[]
    let myJSON = await apiBarChart()
    myJSON.data.forEach(function(Data){
        myChart.data.labels.push(Data.PopID)
        myChart.data.datasets[0].data.push(Data.duration)
        myChart.data.datasets[1].data.push(540)
    })
    myChart.update()
}

//Inicialização gráfico de barras
var ctx = document.getElementById('myChart')
var myChart = new Chart(ctx, {
    type: 'bar',
    data,
    options: {
        elements: {
            point: {
                radius: 0
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (TooltipItem) {
                        let duration = moment.duration(TooltipItem.dataset.data[TooltipItem.dataIndex], 'seconds')
                        duration = duration.hours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + duration.minutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + duration.seconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
                        return duration
                    }
                }
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'TAKT'
                },
                ticks: {
                    callback: function(value, index, values){
                        let duration = moment.duration(value, 'seconds')
                        duration = duration.asMinutes()
                        return duration
                    },
                    stepSize: 60
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'POPID'
                },
                ticks: {
                    display: false
                }
            }
        },
    }
})

//Chamada API - dados para tabela de acordo com filtro de turno
async function API(){
    body = {
        line: {
            name:filter.line,
            initial: filter.initial
        },
        start_date: null,
        end_date: null
    }
    if(filter.turno.length == 1){
        if(filter.turno[0] == '1'){
            body.start_date = moment().format('YYYY-MM-DD') + ' ' + startT1.format('HH:mm:ss')
            body.end_date = moment().format('YYYY-MM-DD') + ' ' + endT1.format('HH:mm:ss')        
        }
        else if (filter.turno[0] == '2') {
            body.start_date = moment().format('YYYY-MM-DD') + ' ' + startT2.format('HH:mm:ss')
            body.end_date = moment().format('YYYY-MM-DD') + ' ' + endT2.format('HH:mm:ss')
        }
        else if (filter.turno[0] == '3') {
            body.start_date = moment().format('YYYY-MM-DD') + ' ' + startT3.format('HH:mm:ss')
            body.end_date = moment().format('YYYY-MM-DD') + ' ' + endT3.format('HH:mm:ss')
        }
    }
    else{
        if (filter.turno.includes('1') && filter.turno.includes('2')){
            body.start_date = moment().format('YYYY-MM-DD') + ' ' + startT1.format('HH:mm:ss')
            body.end_date = moment().format('YYYY-MM-DD') + ' ' + endT2.format('HH:mm:ss')
        }
        else if (filter.turno.includes('2') && filter.turno.includes('3')) {
            body.start_date = moment().subtract(1,'days').format('YYYY-MM-DD') + ' ' + startT2.format('HH:mm:ss')
            body.end_date = moment().format('YYYY-MM-DD') + ' ' + endT3.format('HH:mm:ss')
        }
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
var tableVar = null 
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
        { title: "Situação", data: "situacao", 
            /* render: function (data, type, row, meta) {
                return '<select size="1" id="selection1" name="row-1-office" class="DropdownTable"> <option value = "" selected = "select" >--Selecionar Status--</option> <option value="Stopped" selected="selected"> Parado(Stopped) </option> <option value="Starving">Aguardando (Starving) </option><option value="Blocked"> Bloqueado (Blocked) </option> <option value="Iddle">Inativo (Iddle) </option> </select>'
            } */
        },
        { title: "Responsável", data: "responsavel", 
            /* render: function (data, type, row, meta) {
                return `<select size="1" id="row-1-office" name="row-1-office" class="DropdownTable"> <option value="" selected="select">-- Selecionar Status --</option> <option value="Automação"> Automação </option> <option value="Engenharia"> Engenharia </option> <option value="Logística"> Logística </option> <option value="Manutenção"> Manutenção </option> <option value="Produção"> Produção </option> <option value="Qualidade"> Qualidade </option> <option value="TI"> TI </option> </select>`
            } */
        },
        { title: "Comentários Relevantes", data: "comentario", 
            /* render: function (data, type, row, meta) {
                return '<input type="text" id="row-1-position" name="row-1-position" value="" class="DropdownTable">'
            } */
        },
        { title: "Registrar", data: "btnSave" ,
            render: function (data, type, row, meta) {
                return `<button type="button" class="btnSave" onclick="tableEdit(this)"><span class="btnSave_text">Edit</span></button>`
            }
        },
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
        dataset.push({ startDate: data.LastTimestamp, endDate: data.timestamp, line: formatData.line_name(filter.line), popID: data.PopID, stationName: data.StationName, grupo: "", desvio: data.desvio, alarme: desvio, interferencia: formatData.duration_string(data.interference), situacao: formatData.laborStatus_string(laborStatus), responsavel: data.responsavel, comentario: data.comentarios, btnSave: "", Index: index })
    })

    tableVar = $('#alarm-table').DataTable({
        pagingType: "full_numbers",
        pageLength: 10,
        destroy: true,
        data: dataset,
        columns: columns,
        order: [[0,'desc']],
        autoWidth: false
    })

    $('#alarm-table').on('click', '.Pop-up', function(){
        tablePopup(tableVar.row(this).data(), myJSON)
    })

    document.getElementById('KPIAlarms').innerHTML = dataset.length
}

//Função para botão de editar campo da tabela
function tableEdit(btn){
    let row = btn.parentNode.parentNode
    let respColumn = row.children[10]
    let comentColumn = row.children[11]
    let desvioColumn = row.children[6]
    let btnColumn = row.children[12]
    let lastValueResp = respColumn.innerHTML
    let lastValueDesvio = desvioColumn.innerHTML

    respColumn.innerHTML = `<select size="1" id="row-1-office" name="row-1-office" class="DropdownTable"> <option selected value="">-- Selecionar Status --</option> <option value="N.A."> N.A. </option> <option value="Automação"> Automação </option> <option value="Engenharia"> Engenharia </option> <option value="Logística"> Logística </option> <option value="Manutenção"> Manutenção </option> <option value="Produção"> Produção </option> <option value="Qualidade"> Qualidade </option> <option value="TI"> TI </option> </select>`
    respColumn.children[0].value = lastValueResp

    comentColumn.innerHTML = '<input type="text" id="row-1-position" name="row-1-position" value="' + comentColumn.innerHTML + '" class="DropdownTable">'

    desvioColumn.innerHTML = `<select size="1" id="row-1-office" name="row-1-office" class="DropdownTable"> <option selected value="">-- Selecionar Desvio --</option> <option value="Afiação"> Afiação </option> <option value="Calibração"> Calibração </option> <option value="Colisão"> Colisão </option> <option value="Comunicação"> Comunicação </option> <option value="Danificado"> Danificado </option> <option value="Daski"> Daski </option> <option value="Enroscado"> Enroscado </option> <option value="Escapou"> Escapou </option> <option value="Falha de Solda"> Falha de Solda </option> <option value="Falta de Componente"> Falta de Componente </option> <option value="Falta de Sinal"> Falta de Sinal </option> <option value="Falta de Skid"> Falta de Skid </option> <option value="Falta de Água"> Falta de Água </option> <option value="Falta de Ar"> Falta de Ar </option> <option value="Fluxo de Produção"> Fluxo de Produção </option> <option value="Ginástica Laboral"> Ginástica Laboral </option> <option value="Interferência"> Interferência </option> <option value="Lógica"> Lógica </option> <option value="Obstruído"> Obstruído</option> <option value="Parada Programada"> Parada Programada </option> <option value="Parâmetro"> Parâmetro </option> <option value="Posição"> Posição </option> <option value="Progração"> Programação </option> <option value="Quebrado"> Quebrado </option> <option value="Refeição"> Refeição </option> <option value="Reunião"> Reunião </option> <option value="Rompido"> Rompido </option> <option value="Sequência"> Sequência </option> <option value="Sinal Retido"> Sinal Retido </option> <option value="Sincronismo"> Sincronismo </option> <option value="Sistema"> Sistema </option> <option value="Solto"> Solto </option> <option value="Travado"> Travado </option> <option value="Troca"> Troca </option> </select>`
    desvioColumn.children[0].value = lastValueDesvio

    btnColumn.innerHTML = `<button type="button" class="btnSave" onclick="tableSave(this)"><span class="btnSave_text">Save</span></button> <button type = "button" class="btnSave" onclick = "tableCancel(this)" > <span class="btnSave_text">Cancel</span></button>`
    filter.edit += 1
}

//Função para botão de cancelar no campo da tabela
function tableCancel(btn){
    let row = btn.parentNode.parentNode
    let respColumn = row.children[10]
    let comentColumn = row.children[11]
    let desvioColumn = row.children[6]
    let btnColumn = row.children[12]

    comentColumn.innerHTML = tableVar.row(btnColumn).data().comentario
    respColumn.innerHTML = tableVar.row(btnColumn).data().responsavel
    desvioColumn.innerHTML = tableVar.row(btnColumn).data().desvio
    btnColumn.innerHTML = `<button type="button" class="btnSave" onclick="tableEdit(this)"><span class="btnSave_text">Edit</span></button>`
}

//Função para botão de salvar campo da tabela
function tableSave(btn){
    let row = btn.parentNode.parentNode
    let respColumn = row.children[10]
    let comentColumn = row.children[11]
    let desvioColumn = row.children[6]
    let btnColumn = row.children[12]
    
    if (respColumn.children[0].value != "" && comentColumn.children[0].value != "" && desvioColumn.children[0].value != ""){
        respColumn.innerHTML = respColumn.children[0].value
        comentColumn.innerHTML = comentColumn.children[0].value
        desvioColumn.innerHTML = desvioColumn.children[0].value
        btnColumn.innerHTML = `<button type="button" class="btnSave" onclick="tableEdit(this)"><span class="btnSave_text">Edit</span></button>`
        filter.edit -= 1
        
        if (respColumn.innerHTML != tableVar.row(btnColumn).data().responsavel || comentColumn.innerHTML != tableVar.row(btnColumn).data().comentario || desvioColumn.innerHTML != tableVar.row(btnColumn).data().desvio){
            tableVar.row(btnColumn).data().comentario = comentColumn.innerHTML
            tableVar.row(btnColumn).data().responsavel = respColumn.innerHTML
            tableVar.row(btnColumn).data().desvio = desvioColumn.innerHTML
            insertAPI(tableVar.row(btnColumn).data())
        }
    }
}

// Função para enviar inputs para API-DB
async function insertAPI(rowData){
    let body = {
        tagpath: "[default]front_wall/TypeStation/FT1/Interference",
        t_stamp_interf: myJSONGlobal.data[rowData.Index].t_stamp_millisecs,
        desvio: rowData.desvio,
        responsavel: rowData.responsavel,
        comentario: rowData.comentario,
        t_stamp_comment: moment().valueOf()
    }
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'text/plain;charset=UTF-8')
    let settings = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body)
    }
    const response = await fetch("http://10.251.1.132:8088/system/webdev/BiW_IoTPlatform/rdp_comments_insert", settings)
    const myJSON = await response.json()
    console.log(myJSON)
    return myJSON
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
            info: false
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
            info: false
        })
    }
}

//Função para atualizar dados de acordo com hora atual, respeitando preenchimento de campos da tabela
async function pageRefresh(){
    if (filter.line != null && filter.turno.length != 0 && filter.edit == 0) {
        LineFunction(filter.line)
        let myJSON = await API()
        document.getElementById("updateTime").innerHTML = "Atualizado em: " + moment().format('DD/MM/YYYY HH:mm:ss')
        document.getElementById('Stop').innerHTML = formatData.duration_string(myJSON.total_duration)
        table_generator(myJSON)
        document.getElementsByClassName("btnRefresh")[0].classList.remove("btnRefresh_loading")
        dataBarChart()
    }
}

//Atualização das informações filtradas a cada 1s
setInterval(function (){
    if(!filter.stop){
        pageRefresh()
        filter.stop = true
    }
},1000)

//Atualiza página a cada 60s
setInterval(pageRefresh, 60000)

//Função para botão Refresh
function btnRefresh(button){
    if(!button.classList.contains("btnRefresh_loading")){
        button.classList.add("btnRefresh_loading")
        pageRefresh()
    }
}