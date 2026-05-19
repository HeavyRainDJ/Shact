import React from 'react';
import Plot from 'react-plotly.js';

const LineChart = () => {
    const data = [
        {
            x: [
                '25', '50', '75', '100', '125', '150'
            ],
            y: [9, 11, 5, 12, 3, 10],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'white' },
            line: { color: 'white' }
        }
    ];

    const layout = {
        title: '',
        xaxis: {
            title: 'Запросы',
            tickangle: -45,
            tickfont: {
                color: 'white'
            },
            zeroline: true,
            showline: true,
            linecolor: 'white'
        },
        yaxis: {
            title: 'Количество',
            tickvals: [0, 3, 6, 9, 12],
            ticktext: ['25', '50', '100', '125', '150', '175'],
            tickfont: {
                color: 'white'
            },
            zeroline: true,
            showline: true,
            linecolor: 'white'
        },
        plot_bgcolor: 'rgba(93, 90, 136, 1)',
        paper_bgcolor: 'rgba(93, 90, 136, 1)',
        font: {
            color: 'white'
        },
        autosize: false,
        width: 600,
        height: 400
    };

    const config = {
        displayModeBar: false,
        responsive: false,
        staticPlot: true
    };

    return (
        <Plot
            data={data}
            layout={layout}
            config={config}
        />
    );
};

export default LineChart;