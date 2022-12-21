

const leerArchivo = (e) => {
  const archivo =  e.target.files[0];
  if (!archivo) return;

  const lector = new FileReader();
  lector.onload = function(e){
    const contenido = e.target.result;
    const allLines = contenido.split('\r\n');
    const headers = allLines[0];
    const fieldNames = headers.split(',');

    const arrayInfo = convertirContenido( fieldNames, allLines );

    mostrarContenido(fieldNames, arrayInfo);
  };

  lector.readAsText(archivo);
}


const convertirContenido = ( fieldNames, allLines ) => {
  const dataLines = allLines.slice(1);
  const objList = dataLines.map( (dataLine)=>{
    let obj = {};
    const data = dataLine.split(',');

    fieldNames.forEach( (fieldName, index)=> {
      const asNumber = Number(data[index]);
      fieldName = fieldName.split(" ").join("");

      obj[fieldName.toLowerCase()] = isNaN(asNumber) ? data[index] : asNumber;
    });

    return obj;
  });
  
  return objList;
}


const mostrarContenido = (fieldNames, arrayInfo) => {
  const $tableInfo = document.querySelector('#tableInfo');
  const $tableHead = $tableInfo.querySelector('thead tr');
  const $tableBody = $tableInfo.querySelector('tbody');
  const $fragment = document.createDocumentFragment();


  fieldNames.forEach( (field) => {
    const td = document.createElement('td');
    td.innerHTML = field;
    $tableHead.appendChild(td);
  });


  arrayInfo.forEach( (objeto)=> {
    const tr = document.createElement('tr');

    for (let clave in objeto){
      const td = document.createElement('td');
      td.innerHTML = objeto[clave];
      tr.appendChild( td );
      // console.log(objeto[clave]);
    }
    // console.log(objeto)
    $tableBody.appendChild(tr);
  });
}


const $inputFileLoad = document.querySelector('#inputFileLoad');
$inputFileLoad.addEventListener('change', leerArchivo, false);


