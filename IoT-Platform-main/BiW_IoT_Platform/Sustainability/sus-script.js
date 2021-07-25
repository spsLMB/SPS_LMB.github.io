const chart_filter = {
    line: {
        name: '',
        initial: ''
    },
    type: '',
    error: false,
    variable:{
        name: '',
        unit: '',
        number: [],
        date: {
            realtime: false,
            start: '',
            end: '',
            interval: {
                seconds: 0,
                minutes: 0,
                hours: 0
            }
        },
        path: () => {
            let path_list = []
            let path = '[default]' + chart_filter.line.name + '/' + chart_filter.type + '/' + chart_filter.line.initial + '/' + chart_filter.line.initial + '_' + chart_filter.variable.name + '_'
            
            chart_filter.variable.number.forEach((number) => {
            path_list.push(path + number)
            })
            return path_list
        }
    }
}

let ctx = document.getElementById('myChart')
let myChart = chart_plot()
