const getLabels = (values) => {
    return values
         .map(value => value.date);
}

const getDatasets = (props, values) => {
    var datasets = [];

    for(let i = 0; i < props.datasets.length; i++){
        datasets.push(
            {  
                label: props.datasets[i].label,
                backgroundColor: props.datasets[i].color,
                data: values.map(item => item[props.datasets[i].id]),
                pointRadius: 0
            }
        );
    }
    return datasets;
}  

self.onmessage = (event) => {
    var labels = getLabels(event.data.values);
    var datasets = getDatasets(event.data.props, event.data.values);
    self.postMessage({labels, datasets});
}