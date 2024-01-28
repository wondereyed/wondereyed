/*!
 * Chaturfier (https://chaturfier.com/)
 * Copyright 2024 Chaturfier
 */const stats=(function(){function common_chart_setup(data_url,url_params,show_callback,root_element,section_name){document.addEventListener('lazybeforeunveil',function(event){if(section_name===event.target.dataset['name']){fetch(data_url+'?'+new URLSearchParams(url_params)).then(response=>response.json()).then(response=>{if(response.ok){const
canvas=document.createElement('canvas'),root=document.getElementById(root_element);let
height=root.dataset['height'];if(!height){height=250;}
root.appendChild(canvas);root.style.height=`${height}px`;show_callback(canvas,response['data']);}});}});}
function ticks_callback(value,index,values){return new Intl.NumberFormat('en-US',{notation:"compact",compactDisplay:"short"}).format(value);}
function tooltip_title(items){return luxon.DateTime.fromMillis(items[0].parsed.x).toFormat('EEE d MMM y @ H:mm');}
function tooltip_label(context){let total=0,values=context.parsed._stacks.y;for(let i in values){if(i in[0,1,2,3,4,5])total+=values[i];}
let value=context.raw;let percentage=100*(value/total);let label=context.dataset.label;label+=': ';label+=new Intl.NumberFormat().format(value);label+=' (';label+=new Intl.NumberFormat('en-US',{maximumFractionDigits:1}).format(percentage);label+='%)';return label;}
function tooltip_footer(items,data){let total=items.reduce((acc,item)=>acc+item.raw,0);return'Total: '+new Intl.NumberFormat('en-US').format(total);}
function get_chart_options(label){const plugins={legend:{display:true},tooltip:{mode:'index',intersect:false,callbacks:{title:tooltip_title,label:tooltip_label,footer:tooltip_footer}}};const scales={x:{type:'time',stacked:true,time:{unit:'day',displayFormats:{day:'EEE d MMM'}},ticks:{major:{enabled:true,},source:'auto',autoSkipPadding:15,maxRotation:0}},y:{stacked:true,beginAtZero:true,ticks:{maxTicksLimit:10,callback:ticks_callback},title:{display:true,text:label,}}};return{responsive:true,maintainAspectRatio:false,plugins:plugins,scales:scales};}
function show_broadcasters_chart(canvas,data){const options=get_chart_options('Broadcasters');new Chart(canvas,{type:'line',data:data,options:options,});}
function show_audience_chart(canvas,data){const options=get_chart_options('Users');new Chart(canvas,{type:'line',data:data,options:options,});}
function setup(){const params={theme:current_theme};common_chart_setup('/api/stats/distribution/cams/',params,show_broadcasters_chart,'broadcaster-distribution-chart','broadcasters');common_chart_setup('/api/stats/distribution/users/',params,show_audience_chart,'audience-distribution-chart','audience');}
return{setup:setup}}());;