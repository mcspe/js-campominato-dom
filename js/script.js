/************ DICHIARAZIONE VARIABILI ************/
const levelsDifficulty = [
  'Facile',
  'Medio',
  'Difficile'
];
const levelsNumber = 3;
const container = document.querySelector('.ms-container');
container.pageID = 0;
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
    //console.log(container.lastChild);
    container.lastChild.remove();
    document.body.firstElementChild.lastElementChild.remove();
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
          //msLevelSelector.classList.add('d-none');
          msLevelSelector.remove();
          container.pageID = 2;
          //console.log(msLevelSelector);
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
      const gridSizes = [10, 9, 7];
      const bombNumber = 16;
      const generatedID = [];
      const generatedBomb = [];
      const scoreTrack = [];
      generateUniqueRandomIDList(1, ((gridSizes[gridId - 1]) * (gridSizes[gridId - 1])), generatedID);
      generateUniqueRandomBombList(1, ((gridSizes[gridId - 1]) * (gridSizes[gridId - 1])), bombNumber, generatedBomb);
      const msGridContainer = generateRow(gridSizes[gridId - 1], generatedID, generatedBomb, scoreTrack);
      msGridContainer.className = 'ms-grid-container';
      const scoreDisplay = document.createElement('div');
      scoreDisplay.className = 'ms-display-score position-absolute d-flex flex-column justify-content-center align-items-center';
      const scoreDisplayLabel = document.createElement('span');
      scoreDisplayLabel.innerHTML = 'PUNTEGGIO';
      const scoreDisplayPoints = document.createElement('span');
      scoreDisplay.append(scoreDisplayLabel, scoreDisplayPoints);
      document.body.firstElementChild.append(scoreDisplay);
      //console.log(msGridContainer);
      return msGridContainer;
    }

    function generateRow(size, generatedID, generatedBomb, scoreTrack){
      const parent = document.createElement('div');
      for (let i = 0; i < size; i++) {
        const msRow = generateCell(size, generatedID, generatedBomb, scoreTrack);
        msRow.className = 'ms-row d-flex';
        parent.append(msRow);
      }
      return parent;
    }

    function generateCell(size, generatedID, generatedBomb, scoreTrack){
      const parent = document.createElement('div');      
      //console.log(generatedBomb.length);
      //const scored = true;
      const scoreOnClick = 10;
      let scoreAdd = 0;
      const maxScore = ((size * size) - generatedBomb.length);
      let endGameMsg = `Complimenti!!! Hai Vinto!!!! Hai ottenuto il punteggio massimo di ${maxScore * scoreOnClick} Clicca su RICOMINCIA per giocare ancora!`;
      //console.log(maxScore);
      for (let i = 0; i < size; i++) {
        const msCell = document.createElement('div');
        msCell.className = 'ms-cell';
        //console.log(generatedBomb, generatedID);
        msCell.cellID = generatedID.shift();
        msCell.scored = false;
        msCell.addEventListener('click', function(){
          this.classList.add('clicked');
          if (generatedBomb.includes(msCell.cellID)) {
            this.classList.add('bomb');
            endGameMsg = 'Peccato, hai perso. Clicca su RICOMINCIA per riprovare!' 
            generateEndGameResult(endGameMsg);
            //console.log(document.body.firstElementChild);
          } else {
            if (scoreTrack.length < maxScore - 1) {
              if (this.scored === false) {
                this.scored = true;
                scoreTrack.push(this.scored);
                scoreAdd = scoreTrack.length * scoreOnClick;
                document.body.firstElementChild.lastElementChild.lastElementChild.innerHTML = scoreAdd;
                //console.log(scoreTrack);
              }
            } else {
              generateEndGameResult(endGameMsg);
            }
          }
          
        });
        parent.append(msCell);
      }
      
      return parent;
    }

    function generateEndGameResult(endGameMsg) {
      const displayResultContainer = document.createElement('div');
      displayResultContainer.className = 'ms-display-result position-absolute d-flex flex-column justify-content-around align-items-center';
      const resultMsg = document.createElement('span');
      resultMsg.innerHTML = endGameMsg;
      resultMsg.className = 'text-center fw-bold';
      const startAgainBtn = document.createElement('button');
      startAgainBtn.className = 'ms-btn ms-start';
      startAgainBtn.innerHTML = 'Ricomincia';
      startAgainBtn.addEventListener('click', function(){
        container.pageID = 1;
        container.lastChild.remove();
        //console.log(document.body.firstElementChild.firstElementChild);
        container.append(generateLevelSelector(levelsNumber, levelsDifficulty, container));
        backBtn.classList.add('d-none');
        //console.log(this.parentElement);
        this.parentElement.remove();
        document.body.firstElementChild.lastElementChild.remove();
      });
      displayResultContainer.append(resultMsg, startAgainBtn);
      document.body.firstElementChild.append(displayResultContainer);
    }

    function generateUniqueRandomIDList(min, max, generatedID) {
      for (i = 0; i < max; i++) {
        const selectedID = generateUniqueRandomID(min, max, generatedID);
        generatedID.push(selectedID);
      }
      //console.log(generatedID);
    }

    function generateUniqueRandomBombList(min, max, bombNumber, generatedBomb) {
      for (i = 0; i < bombNumber; i++) {
        const selectedBomb = generateUniqueRandomID(min, max, generatedBomb);
        generatedBomb.push(selectedBomb);
      }
      //console.log(generatedBomb);
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