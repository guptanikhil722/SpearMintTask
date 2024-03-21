import React,{useEffect, useState, useRef} from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import axiosMain from '../axios/axios_main';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function GraphChart() {
const [xAxisValues, setXAxisValues] = useState([])
const [yAxisValues, setYAxisValues] = useState([])
const graphData = useRef([])
const getYAxisData=async()=>{
    try {
        let res = await axiosMain.get('o5zMs5/data')
        if(res.data.length>0 && res.status == 200){
        setYAxisValues(res.data.slice(0,50))
        console.log('y axis>>.',yAxisValues)
    }else{
        setYAxisValues([])
    }
    } catch (error) {
        
    }

}
const getXAxisData=async()=>{
    try {
        let res = await axiosMain.get('gDa8uC/data')
        if(res.data.length>0 && res.status == 200){
        setXAxisValues(res.data.slice(0,50))
    }else{
        setXAxisValues([])
    }
    } catch (error) {
        
    }

}

useEffect(() => {
    getXAxisData()
    getYAxisData()
    // combinedData()
}, [])

   const newArr = xAxisValues.map((xValue, index) => [parseFloat(xValue.RandomNumber?xValue.RandomNumber:getXAxisData()), parseFloat(yAxisValues[index].RandomNumber?yAxisValues[index].RandomNumber:getYAxisData())])

const options = {
    scales: {
      y: {
        // stacked: true,
        grid: {
          display: true,
          color: "rgba(255,99,132,0.2)",
          borderColor:'#ffffff'

        },
        ticks:{
            color:'#ffffff'
        }
      },
      x: {
        grid: {
          display: true,
          color: "rgba(255,99,132,0.2)"
        },
        ticks:{
            color:'#ffffff'
        }
      }
    },
    elements: {
          line: {
                tension: .1, // bezier curves
           }
    }
  };
 const data = {
    datasets: [ {
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        label: "A dataset",
        data: newArr,
        backgroundColor: "rgba(255, 99, 132, 1)",
        
      },
    ],
  };
    return (
        <div className="chart">
         <span className='title'>XY-PLOT CHART</span> 
          <Scatter options={options} data={data} />
        </div>
      );
}

export default GraphChart