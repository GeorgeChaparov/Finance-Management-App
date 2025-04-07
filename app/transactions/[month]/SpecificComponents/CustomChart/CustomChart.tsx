"use client"

import Chart from 'chart.js/auto'
import { Doughnut } from "react-chartjs-2";
import { ArcElement } from "chart.js";

type CustomChartProps = {categories: any, amountForCategory: number[]};
function CustomChart({categories, amountForCategory}: CustomChartProps) {
    Chart.register(ArcElement);

    return(
        <Doughnut 
            data={{
                labels: categories,
                datasets:[
                    {
                        label: categories,
                        data: amountForCategory,
                        borderWidth: 0,
                        borderRadius: 20,
                    },
                ]
            }}
                
            options ={{
                cutout: '85%', // This value controls the thickness of the doughnut
                plugins:{
                    legend:{
                        position: "right",
                        align: "center",  
                        labels: {
                            font: {
                                size: 16 // Adjust this value to change label font size
                            },
                            usePointStyle: true, // Use point style for legend
                            pointStyle: 'circle', // Options: 'circle' for round, 'rect' for cube
                            padding: 25,
                        }
                    }
                },

                layout:{
                    padding:{
                        left: 4
                    }
                },
                elements:{
                    arc:{
                        spacing: 8
                    }
                }
            }}
        /> 
    );
    
}

export default CustomChart;