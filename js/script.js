/************ DICHIARAZIONE VARIABILI ************/
const levelsDifficulty = [
  'Facile',
  'Medio',
  'Difficile'
];
const levelsNumber = 3;
const container = document.querySelector('.ms-container');
container.pageID = 0;
const containerDefault = container.innerHTML;
const startBtn = document.querySelector('.ms-btn.ms-start');
const backBtn = document.querySelector('.ms-btn.ms-back');


 /************ LOGICA ************/
startBtn.addEventListener('click', function(){
  startBtn.classList.add('d-none');
  container.pageID = 1;
  //console.log(container.pageID);
  container.append(generateLevelSelector(levelsNumber, levelsDifficulty, container));
  //console.log(startBtn);
});

backBtn.addEventListener('click', function(){
  if (container.pageID === 2){
    container.pageID = 1;
    container.lastChild.remove();
    container.append(generateLevelSelector(levelsNumber, levelsDifficulty, container));
    backBtn.classList.add('d-none');
  }
});

    /************ FUNZIONI ************/
    function generateLevelSelector(levels, difficultyTag, printBox){
      const msLevelSelector = document.createElement('div');
      msLevelSelector.className = 'ms-levels d-flex justify-content-center align-items-center flex-wrap py-5';
      
      for (let i = 1; i <= levels; i++) {
        const msLevelBtn = document.createElement('button');
        msLevelBtn.className = `ms-btn ms-level ms-level-${i}`;
        msLevelBtn.difficultyID = i;
        msLevelBtn.addEventListener('click', function () {
          backBtn.classList.remove('d-none');
          msLevelSelector.classList.add('d-none');
          container.pageID = 2;
          //console.log(container.pageID);
          printBox.append(generateGrid(this.difficultyID));
        });
        msLevelSelector.append(msLevelBtn);
      }

      //console.log(msLevelSelector.children);
      
      const threePartIndex = Math.ceil(msLevelSelector.children.length / 3);
      const btnArr = Array.from(msLevelSelector.children);

      //console.log(threePartIndex, btnArr);

      const thirdPart = nameLevel(splitLevels(btnArr, threePartIndex), difficultyTag[2]);
      const secondPart = nameLevel(splitLevels(btnArr, threePartIndex), difficultyTag[1]);
      const firstPart = nameLevel(btnArr, difficultyTag[0]);     

      //console.log(firstPart, secondPart, thirdPart, msLevelSelector.children[2].difficultyID);

      return msLevelSelector;
    }

    function splitLevels(array, index){
      //TODO: check for data to be array and number
      const partedArray = array.splice(- index);

      return partedArray;
    }

    function nameLevel(arr, difficulty){
      //TODO: check for data to be array of HTML Elements and string
      for (let i = 0; i < arr.length; i++) {
        arr[i].innerHTML = (i === 0) ? difficulty : `${difficulty} - ${i+1}`;
      }
      return arr;
    }

    function generateGrid(gridId){
      const gridSizes = [10, 9, 7]
      const generatedID = [];
      generateUniqueRandomIDList(1, ((gridSizes[gridId - 1]) * (gridSizes[gridId - 1])), generatedID);
      const msGridContainer = generateRow(gridSizes[gridId - 1], generatedID);
      msGridContainer.className = 'ms-grid-container';
      
      //console.log(generatedID);
      return msGridContainer;
    }

    function generateRow(size, generatedID){
      const parent = document.createElement('div');
      for (let i = 0; i < size; i++) {
        const msRow = generateCell(size, generatedID);
        msRow.className = 'ms-row d-flex';
        parent.append(msRow);
      }
      return parent;
    }

    function generateCell(size, generatedID){
      const parent = document.createElement('div');
      for (let i = 0; i < size; i++) {
        const msCell = document.createElement('div');
        msCell.className = 'ms-cell';
        msCell.cellID = generatedID.shift();
        msCell.addEventListener('click', function(){
          this.classList.toggle('clicked');
          console.log(this.cellID);
        });
        parent.append(msCell);
      }
      
      return parent;
    }

    function generateUniqueRandomIDList(min, max, generatedID) {
      for (i = 0; i < max; i++) {
        const selectedID = generateUniqueRandomID(min, max, generatedID);
        generatedID.push(selectedID);
      }
      //console.log(generatedID);
    }

    function generateUniqueRandomID(min, max, generatedID) {
      let error = false;
      let errorMsg;
      let isValid = false;
      let selectedID;

      if ((isNaN(min)) || (isNaN(max))) {
        error = true;
        errorMsg = 'Controlla che i dati inseriti siano numeri';
      }
      if (max < min) {
        error = true;
        errorMsg = 'Il valore minimo è maggiore o uguale al valore massimo';
      }
      if (error) {
        console.error(errorMsg);
      }

      while (!isValid) {
        selectedID = Math.floor(Math.random() * (max - min + 1) + min);
        isValid = (generatedID.includes(selectedID)) ? false : true;
      }
      
      return selectedID;
    }