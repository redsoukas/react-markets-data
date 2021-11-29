import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useRef } from "react";
import { Loader } from 'shared/components';
export const PriceChart = ({state, title}: any) => {
 
  
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  if (state?.loading) return (
    <div style={{height: '400px'}}>
      <Loader />
    </div>
  );

  const options: Highcharts.Options = {
    title: {
      text: title
    },
    series: [{
      name: 'Price',
      type: 'line',
      data: state?.data?.prices
    }],
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%Y-%m-%d}'
      }
    }
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      >
    </HighchartsReact>
  );
}