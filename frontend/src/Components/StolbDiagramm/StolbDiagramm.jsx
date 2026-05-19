import React from 'react';
import Plot from 'react-plotly.js';

const StolbDiagramm = ({ data }) => {
    // Extracting names and amounts from the data
    const xValues = data.map(item => item.Name);
    const yValues = data.map(item => item.Amount);

    return (
        <Plot
            data={[
                {
                    x: xValues,
                    y: yValues,
                    type: 'bar',
                    marker: { color: 'white' },
                },
            ]}
            layout={{
                xaxis: {
                    title: {
                        text: 'Направления',
                        font: {
                            family: 'DM Sans, sans-serif',
                            size: 16,
                            color: 'white'
                        },
                        standoff: 20 // Отступ заголовка от оси X
                    },
                    linecolor: 'white',
                    linewidth: 2,
                    ticks: 'outside',
                    tickcolor: 'white',
                    tickwidth: 2,
                    tickfont: {
                        family: 'DM Sans, sans-serif',
                        size: 14,
                        color: 'white'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Количество',
                        font: {
                            family: 'DM Sans, sans-serif',
                            size: 16,
                            color: 'white'
                        },
                        standoff: 11 // Отступ заголовка от оси Y
                    },
                    linecolor: 'white',
                    linewidth: 2,
                    ticks: 'outside',
                    tickcolor: 'white',
                    tickwidth: 2,
                    tickfont: {
                        family: 'DM Sans, sans-serif',
                        size: 14,
                        color: 'white'
                    },
                    showline: true,
                    showgrid: false,
                    zeroline: false
                },
                paper_bgcolor: 'rgba(93, 90, 136, 1)',
                plot_bgcolor: 'rgba(93, 90, 136, 1)',
                autosize: true,
                margin: {
                    l: 50,
                    r: 50,
                    b: 50,
                    t: 50,
                    pad: 0.5
                },
                width: 1069,
                height: 350
            }}
            config={{
                displayModeBar: false,  // Убирает интерфейс Plotly
                staticPlot: true        // Запрещает масштабирование и перемещение
            }}
        />
    );
};

export default StolbDiagramm;