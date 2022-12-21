

const leerArchivo = (e) => {
  const archivo =  e.target.files[0];
  if (!archivo) return;

  const lector = new FileReader();
  lector.onload = function(e){
    dataFile = e.target.result.split('\r\n');
    headersFields = dataFile[0].split(',');
    const infoArray = convertirContenido( dataFile );
    mostrarContenido( infoArray );
  };

  lector.readAsText(archivo);
}


const convertirContenido = ( dataFile ) => {
  const dataLines = dataFile.slice(1).filter( dataLine => dataLine != "");
  objList = dataLines.map( (dataLine)=>{
      let obj = {};
      const data = dataLine.split(',');

      headersFields.forEach( (header, index)=> {
        const asNumber = Number(data[index]);
        header = header.split(" ").join("");
        obj[header.toLowerCase()] = isNaN(asNumber) ? data[index] : asNumber;
      });
      return obj;
  });
  return objList;
}


const mostrarContenido = ( infoArray ) => {
  const $tableInfo = document.querySelector('#tableInfo');
  const $tableHead = $tableInfo.querySelector('thead tr');
  const $tableBody = $tableInfo.querySelector('tbody');
  const $fragment = document.createDocumentFragment();
  $searchInput.classList.remove('d-none');

  $tableHead.innerHTML = '';
  $tableBody.innerHTML = '';



  headersFields.forEach( (field) => {
    const td = document.createElement('td');
    td.innerHTML = field;
    $tableHead.appendChild(td);
  });


  infoArray.forEach( (objeto)=> {
    const tr = document.createElement('tr');

    for (let clave in objeto){
      const td = document.createElement('td');
      td.innerHTML = objeto[clave];
      tr.appendChild( td );
      $fragment.appendChild( tr )
    }
    $tableBody.appendChild( $fragment );
  });
}

const filtarInfo = ( e ) => {
  const word = e.target.value.trim();
  const searchInfo = objList.filter( (element) => element.name.toLowerCase().includes(word) );
  mostrarContenido( searchInfo );
}

const $inputFileLoad = document.querySelector('#inputFileLoad');
$inputFileLoad.addEventListener('change', leerArchivo, false);

const $searchInput = document.querySelector('#searchInput');
$searchInput.addEventListener('keyup', filtarInfo);



