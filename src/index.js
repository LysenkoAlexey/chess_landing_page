import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

let tableOriginal = {
  debut: ['Сицилианская защита', 'Открытое начало', 'Дебют Рети', 'Английское начало', 'Староиндийское начало', 'Дебют Ларсена', 'Французская защита', 'Защита Каро-Канн', 'Защита Пирца-Уфимцева', 'Защита Робача', 'Дебют ферзевых пешек', 'Голландская защита', 'Вариант Бенони', 'Англо-Индийская защита', 'Дебют четырех коней', 'Защита Алехина', 'Защита Бенони', 'Защита Грюнфельда', 'Защита Нимцовича', 'Защита Филидора'],
  moves: ['1.e4 с5', '1.е4 е5', '1.Nf3', '1.c4', '1.g3', '1.b3', '1.e4 e6', '1.e4 c6', '1.e4 d6', '1.e4 g6', '1.d4 d5', '1.d4 f5', '1.d4 g6', '1.c4 Nf6', '1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6', '1.e4 Nf6', '1.d4 Nf6 2.c4 c5 3.d5','1.d4 Nf6 2.c4 e6 3.Nc3 d5', '1.d4 Nf6 2.c4 e6 3.Nc3 Cb4', '1.e4 e5 2.Nf3 d6'],
  parties: [115998, 49163, 59276, 45320, 5864, 1505, 31007, 16320, 9509, 8499, 43384, 5798, 5568, 13834, 2067, 5823, 8990, 9621, 19086, 1307],
  percent: [46.4, 44.7, 55.7, 56.3, 55, 52.9, 44.3, 44.7, 44.1, 44.9, 42.7, 41.7, 42.5, 42.4, 48.5, 43.4, 58.2, 44.3, 45.7, 39.7],
  openness: ['Открытый', 'Открытый', 'Закрытый', 'Закрытый', 'Закрытый', 'Закрытый', 'Полуоткрытый', 'Полуоткрытый', 'Полуоткрытый', 'Полуоткрытый', 'Закрытый', 'Закрытый', 'Закрытый', 'Закрытый', 'Открытый', 'Полуоткрытый', 'Закрытый', 'Закрытый', 'Закрытый', 'Открытый'],
  columnNames: ['№', 'Дебют','Ходы','Количество партий','Процент побед', 'Открытость'],
}

let superTable = [];
for (let i = 0; i < tableOriginal.debut.length; i++) {
    let toAdd = {};
    toAdd.number = i + 1;
    toAdd.debut = tableOriginal.debut[i];
    toAdd.moves = tableOriginal.moves[i];
    toAdd.parties = tableOriginal.parties[i];
    toAdd.percent = tableOriginal.percent[i];
    toAdd.openness = tableOriginal.openness[i];
    superTable.push(toAdd);
}

function SuperLink(props) {
  const [textLink, setTextLink] = React.useState({
    text: props.text,
    link: props.link
  });

  const press1 = () => {
    setTextLink({
      text: 'Спасибо, что нажали и проверили.',
      link: ''
  });
  };

  return(<>{textLink.text}<a href={props.link} target='_blank' onClick={press1}>{textLink.link}</a></>)
}

function AddTh (props) {
  if (props.tableKeys.keysBool[props.i]) {
      console.log(props.tableKeys.keysBool[props.i]);
      return(<th>{props.tableKeys.keysArray[props.i]}</th>)
    }
}

function MakeDynamicTable2(props) {
  console.log('renrering')
  const keys = Object.keys(props.table[0]);
  let boolArr = [];
  for (let i = 0; i < keys.length; i++) {
    boolArr.push(true);
  }
  const [tableKeys, setTableKeys] = React.useState({
    keysArray: keys,
    keysBool: boolArr,
  });

  const onChange = (e,i) => {
    //e.target.checked=!e.target.checked
    let updatedKeys = tableKeys.keysBool
    updatedKeys[i]=!tableKeys.keysBool[i]
    setTableKeys(tableKeys => ({
    ...tableKeys,updatedKeys
  }));


    //console.log(i,boolArr[i], tableKeys.keysBool[i]);
  }

  return(<>
<SuperLink text='Нажмите для проверки работы ссылки:' link = 'http://lysenkoal3.temp.swtest.ru/'/>
    <form>
  {tableKeys.keysArray.map(function(object, i) {
    return (<>
      <label><input type= 'checkbox' name = 'toCheck' defaultChecked={true} value={i} onChange={ (e) => onChange(e,i) }/>{object}</label></>)
})}
  </form>

  <table>
  <thead>
  <tr>
  {tableKeys.keysArray.map(function(object, i) {
    //console.log(object, i);
    return (<><AddTh tableKeys = {tableKeys} i = {i} /></>)
})}
  </tr>
  </thead>


   <tbody>
    {props.table.map(function(object2, j) {
          return(<><tr>
            {tableKeys.keysArray.map(function(key, i) {
              if (tableKeys.keysBool[i]) {return (<><td>{object2[key]}</td></>)}
})}
        </tr>
        </>)
     })
     }
   </tbody>
    
   </table>

</>
)
}

root.render(<MakeDynamicTable2 table = {superTable}  />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
