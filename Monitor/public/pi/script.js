function updateDisplay() {  
  var url = 'http://localhost:3002/job/getjob2';
  var myStyles = ['#BD3613','#D11C24','#C61C6F','#595AB7','#2176C7'];
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'text';

  request.onload = function () {
    // console.log(request.response);
    var obj = JSON.parse(request.response);
    var nodes = [];//{ width:200, name: "IT", color: '#A57706'}
    fLen = obj.length;
    for (i = 0; i < fLen; i++) {     
      console.log(obj[i].company); 
      nodes.push({ width: (i+1)*100, name: obj[i].company, color: myStyles[i]});
    }
    d3.selectAll('#chart2').selectAll('div')
      .data(nodes)
      .enter().append('div')
      .classed('item', true)
      .text(function (d) {
        return d.name;
      })
      .style({
        'color': 'white',
        'background': function (d) {
          return d.color;
        },
        width: function (d) {
          return d.width + 'px';
        }
      })

  };

  request.send();
};

window.onload = function () {
  // updateDisplay();
  // updateDisplay2();
};







