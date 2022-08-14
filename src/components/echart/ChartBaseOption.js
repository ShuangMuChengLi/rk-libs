// chartBaseOption.js
export default {
  color: [
    '#0067E1',
    '#0CC1FF',
    '#00D1B3',
    '#85E814',
    '#FFA082'
  ],
  tooltip: {
    backgroundColor: '#121830',
    borderWidth: 0,
    textStyle: {
      color: '#A0B2B9',
      fontSize: 14
    }
  },
  legend: {
    textStyle: {
      color: '#ffffff',
      fontSize: 12
    }
  },
  grid: {
    top: '13%',
    left: '3%',
    right: '5%',
    bottom: '2%',
    containLabel: true
  },
  xAxis: {
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#ffffff',
      textStyle: {
        fontSize: 12
      }
    }
  },
  yAxis: {
    axisLabel: {
      color: '#ffffff',
      textStyle: {
        fontSize: 12
      }
    },
    axisLine: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        width: 0.5,
        color: '#C3C9E3',
        opacity: 0.5
      }
    },
    axisTick: {
      show: false
    }
  }
};
