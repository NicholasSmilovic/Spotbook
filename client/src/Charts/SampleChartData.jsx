import React, {Component} from 'react';

const SampleData = () => {
  return {
    labels: [
        'Carlo',
        'Nich',
        'Brandon',
        'Bryce',
        'Dummy_1',
        'Dummy_2',
        'Dummy_3',
        'Dummy_4',
        'Dummy_5',
        'Dummy_6'
    ],
    datasets:[{
        label:'Stuff',
        data:[50,80,70,100,110,20,40,25,80,10],
    }]
  };
}

export default SampleData;