import React,{useEffect, useState, useRef, useMemo} from 'react'
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
const getYAxisData=()=>{
    return new Promise(async(resolve,reject)=>{
    try {
        let res = await axiosMain.get('o5zMs5/data')
        if(res.data.length>0 && res.status == 200){
        setYAxisValues(res.data.slice(0,50))
        // console.log('y axis>>.',yAxisValues)
        resolve()
    }else{
        setYAxisValues([])
    }
    } catch (error) {
        reject()
    }
})

}
const getXAxisData=()=>{
    return new Promise(async(resolve,reject)=>{
    try {
        let res = await axiosMain.get('gDa8uC/data')
        if(res.data.length>0 && res.status == 200){
        setXAxisValues(res.data.slice(0,50))
        resolve()
    }else{
        setXAxisValues([])
    }
    } catch (error) {
        reject()
    }
})

}

useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getXAxisData(), getYAxisData()]);
    };
  
    fetchData();
  }, []);
 
  useEffect(() => {
    const newArr = xAxisValues.map((xValue, index) => [
      parseFloat(xValue.RandomNumber),
      parseFloat(yAxisValues[index].RandomNumber),
    ]);
    graphData.current = newArr;
  },[xAxisValues, yAxisValues])
  
   
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
        data: graphData.current,
       
        
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