//---------------------------------------Table initialization------------------------------------
$('#alarm-table').DataTable({
    pagingType: "full_numbers",
    pageLength: 10,
    ordering: false,
    dom: '<"dt-buttons"Bf><"clear">lirtp',
    buttons: [
        'pdfHtml5',
    ],
    data: [],
    columns: ['', '', '', '', '']
})

//----------------------------------------------Filter-------------------------------------------------------
const system_filter = {
    line: {
        name: null,
        initial: null
    },
    tags: () => {
        let tags = []
        tags.push(
            [
                '[default]'.concat(system_filter.line.name, '/System/', system_filter.line.initial, '/', 'Firmware'),
                '[default]'.concat(system_filter.line.name, '/System/', system_filter.line.initial, '/', 'OrderNumber'),
                '[default]'.concat(system_filter.line.name, '/System/', system_filter.line.initial, '/', 'SerialNumber'),
                '[default]'.concat(system_filter.line.name, '/System/', system_filter.line.initial, '/', 'TiaPortalVersion')
            ]
        )
        return tags
    },
    all: {
        names: [],
        initials: [],
        tags: () => {
            let tags = []
            system_filter.all.names.forEach((name, index) => {
                tags.push(
                    [
                        '[default]'.concat(name, '/System/', system_filter.all.initials[index], '/', 'Firmware'),
                        '[default]'.concat(name, '/System/', system_filter.all.initials[index], '/', 'OrderNumber'),
                        '[default]'.concat(name, '/System/', system_filter.all.initials[index], '/', 'SerialNumber'),
                        '[default]'.concat(name, '/System/', system_filter.all.initials[index], '/', 'TiaPortalVersion')
                    ]
                )
            })
            return tags
        }
    }
}

//--------------------------------------Data Format-------------------------------------------------------
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
    }
}

//--------------------------------------Process Option----------------------------------------------------
function process_option(option) {
    system_filter.all.names = []
    system_filter.all.initials = []
    system_filter.line.name = null
    system_filter.line.initial = null

    if (option.value == 'all') {
        option.childNodes.forEach((child) => {
            if (child.tagName == 'OPTION' && !child.disabled && child.value != 'all') {
                let split_name = child.value.split('-')
                system_filter.all.names.push(split_name[0])
                system_filter.all.initials.push(split_name[1])
            }
        })
        console.log(system_filter.all.names)
        console.log(system_filter.all.initials)
    } else {
        let list_split = option.value.split('-')

        system_filter.line.name = list_split[0]
        system_filter.line.initial = list_split[1]


        console.log(system_filter.line.name) //Teste (depois apagar)
        console.log(system_filter.line.initial) //Teste (depois apagar)
    }
}

//----------------------------------------Table--------------------------------------------------------
function table_generator(api_data, line_names, line_initials) {
    let formated_names = []
    let table_dataset = []
    let table_columns = [
        { title: 'Process' },
        { title: 'Firmware' },
        { title: 'Order Number' },
        { title: 'Serial Number' },
        { title: 'Tia Portal Version' }
    ]

    line_names.forEach((line, index) => {
        formated_names.push(format_data.line_name(line, line_initials[index]))
    })

    api_data.data.forEach((process, index) => {
        table_dataset.push([formated_names[index], process[0], process[1], process[2], process[3]])
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

//---------------------------------------------API----------------------------------------------------------
async function system_api(button) {
    if (system_filter.all.names.length != 0 && system_filter.all.initials.length != 0) {
        var raw = {
            'tags': system_filter.all.tags()
        }
    } else {
        var raw = {
            'tags': system_filter.tags()
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

    const response = await fetch('http://10.251.1.132:8088/system/webdev/BiW_IoTPlatform/tags_reading', settings)
        .catch(error => {
            button.classList.remove('btnRefresh_loading')
            alert('Ocorreu um erro na requisição dos dados')
        });
    const myJson = await response.json()

    return myJson
}


async function refresh_button(button) {
    if (!button.classList.contains('btnRefresh_loading')) {
        button.classList.add('btnRefresh_loading')
        if (system_filter.line.name != null && system_filter.line.initial != null && system_filter.all.names.length == 0 && system_filter.all.initials.length == 0) {
            let line_names_temp = [system_filter.line.name]
            let line_initials_temp = [system_filter.line.initial]
            let myJson = await system_api(button)
            console.log(myJson.data)
            table_generator(myJson, line_names_temp, line_initials_temp)
        } else if (system_filter.line.name == null && system_filter.line.initial == null && system_filter.all.names.length != 0 && system_filter.all.initials.length != 0) {
            let line_names_temp = system_filter.all.names
            let line_initials_temp = system_filter.all.initials
            let myJson = await system_api(button)
            console.log(myJson.data)
            table_generator(myJson, line_names_temp, line_initials_temp)
        }
        button.classList.remove('btnRefresh_loading')
    }
}