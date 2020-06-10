import React from 'react';
import { ChartOptions } from 'canvasjs';
import styles from './canvasJSChart.module.css';
const CanvasJS = window.CanvasJS;

interface CanvasJSChartProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  options: ChartOptions;
}

class CanvasJSChart extends React.Component<CanvasJSChartProps> {
  static _cjsContainerId = 0;
  options: ChartOptions;
  chartContainerId: string;
  chart: any;

  constructor(props: CanvasJSChartProps) {
    super(props);
    this.options = props.options;
    this.chartContainerId = 'canvasjs-react-chart-container-' + CanvasJSChart._cjsContainerId++;
  }
  componentDidMount() {
    this.chart = new CanvasJS.Chart(this.chartContainerId, this.options);
    this.chart.render();
  }

  shouldComponentUpdate(nextProps: CanvasJSChartProps, nextState: CanvasJSChartProps) {
    return !(nextProps.options === this.options);
  }

  componentDidUpdate() {
    //Update Chart Options & Render
    this.chart.options = this.props.options;
    this.chart.render();
  }

  componentWillUnmount() {
    //Destroy chart and remove reference
    this.chart.destroy();
  }

  render() {
    const {options, ...rest} = this.props;
    return <div id={this.chartContainerId} className={styles.container} {...rest} />;
  }
}

export const CanvasJSReact = {
  CanvasJSChart: CanvasJSChart,
  CanvasJS: CanvasJS,
};
