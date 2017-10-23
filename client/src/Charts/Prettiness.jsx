import React, {Component} from 'react';

const Prettiness = (chartData, palette) => {
    let data = chartData;
    data.datasets[0]["borderColor"] = '#EEEEEE';
    data.datasets[0]["borderWidth"] = '';
    data.datasets[0]["backgroundColor"] = palette;

    return {
        data
    };
}

export default Prettiness;