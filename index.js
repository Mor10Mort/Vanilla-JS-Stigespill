'use strict';

const boardMechanics = {
  tiles: 100,
  playerSteps: 1,
  rememberTheSteps: [],
  allLadders: [],
  theGreenTilesTop: [],
  theGreenTilesBottom: [],
  theGreenTilesPosX: [],
  theBoardDiv: document.getElementById('theBoard'),
  theTile: document.getElementById('squareNumber' + this.playerSteps),
  theActiveTileStored: [],
  theActiveTilePositions: function (theElement) {
    let rect = theElement.getBoundingClientRect();
    return {
      'left': rect.left,
      'top': rect.top,
      'bottom': rect.bottom,
      'right': rect.right,
      'center': rect.center
    };
  },
  cleanTheLastTile: function (amount) {
    let theLastTile = this.rememberTheSteps[this.rememberTheSteps.length - amount];
    document.getElementById('squareNumber' + theLastTile).style.backgroundColor = this.colors[this.randomColor()];
  },
  colors: ["#FADED5", "#DEBFBD", "#F5DDE2", "#DEBDD4", "#F6D5FA"],
  randomColor: function () {
    return Math.floor(Math.random() * this.colors.length)
  },
  randoNumber: function (min, max) {
    return 6;
    //return min + Math.floor(Math.random() * (max - min + 1));
  },
  createTheBoard: function () {
    for (let i = this.tiles; i >= 0 + 1; i--) {
      let frameDiv = document.createElement('div');
      frameDiv.id = "squareNumber" + i;
      frameDiv.innerHTML = i;
      frameDiv.style.backgroundColor = this.colors[this.randomColor()];
      this.theBoardDiv.append(frameDiv);
    }
    boardMechanics.activeTile();
    this.moveTheDude();

    //LAGE SLANGER OG STIGENE
    //denne kopierte jeg fra https://thewebdev.info/2021/09/12/how-to-draw-a-line-between-two-divs-with-javascript/
    const getOffset = (el) => {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight,
        xCenter: (rect.left + window.pageXOffset + rect.right) / 2,
        yCenter: (rect.top + window.pageYOffset + rect.bottom) / 2
      };
    }

    const connect = (div1, div2, theClass, thickness) => {
      const off1 = getOffset(div1);
      const off2 = getOffset(div2);

      const x1 = off1.xCenter;
      const y1 = off1.top + off1.height / 2;
      const x2 = off2.xCenter;
      boardMechanics.theGreenTilesPosX.push(x2);
      const y2 = off2.yCenter;

      const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));

      const cx = ((x1 + x2) / 2) - (length / 2);
      const cy = ((y1 + y2) / 2) - (thickness / 2);
      const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);

      const htmlLine = "<div id='ladderUp' class='ladder " + theClass + "' style='padding:0px; margin:0px; height:" + thickness + "px; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";

      document.body.innerHTML += htmlLine;
    }

    function makeTilesGreenOrRed(name, element1, element2, theColor) {
      
      let getTheDigitsElement1 = parseInt(element1.slice(-2));
      let getTheDigitsElement2 = parseInt(element2.slice(-2));
      //lage key/value pair for stigene
      if (boardMechanics.allLadders[getTheDigitsElement2] === undefined) {
        boardMechanics.allLadders[getTheDigitsElement2] = [];
    }
      Object.assign(boardMechanics.allLadders[getTheDigitsElement2], {topVerdi: getTheDigitsElement1, bottomVerdi: getTheDigitsElement2});

      const d1 = document.getElementById(element1);
      const d2 = document.getElementById(element2);

      if (theColor == 'green') {
        connect(d1, d2, 'up', 10);
        d1.style.backgroundColor = "#88F7B8";
        d2.style.backgroundColor = "#88F7B8";
        boardMechanics.theGreenTilesTop.push(parseInt(element1.slice(-2)));
        boardMechanics.theGreenTilesBottom.push(parseInt(element2.slice(-2)));

        

      } else if (theColor == 'red') {
        connect(d1, d2, 'down', 10);
        d1.style.backgroundColor = "#88F7B8";
        d2.style.backgroundColor = "#88F7B8";
      }
    }

    makeTilesGreenOrRed('Stige 1', 'squareNumber96', 'squareNumber12', 'red');
    makeTilesGreenOrRed('Stige 2', 'squareNumber53', 'squareNumber31', 'green');
    makeTilesGreenOrRed('Stige 3','squareNumber46', 'squareNumber13', 'green');
    makeTilesGreenOrRed('Stige 4','squareNumber97', 'squareNumber56', 'green');
    makeTilesGreenOrRed('Stige 5','squareNumber36', 'squareNumber19', 'red');
    makeTilesGreenOrRed('Stige 6', 'squareNumber89', 'squareNumber57', 'red');
    makeTilesGreenOrRed('Stige 7', 'squareNumber92', 'squareNumber73', 'red');
    //SLUTT markere snakes and ladders
  },
  rollTheDize: function (event) {
    boardMechanics.playerSteps += boardMechanics.randoNumber(1, 6);
    //  console.log(boardMechanics.playerSteps);
    boardMechanics.activeTile();
    this.playerMechanics();
  },
  moveTheDude: function () {
    let heroDiv = document.createElement('div');
    heroDiv.id = "theHeroImage";
    let theActiveTile = document.getElementById('squareNumber1');
    theActiveTile.append(heroDiv);
    this.theActiveTilePositions(theActiveTile);
  },
  activeTile: function () {
console.log(this.playerSteps);
    if (this.playerSteps <= 100) {
      const theTile = document.getElementById('squareNumber' + this.playerSteps);
      theTile.style.backgroundColor = "#FF6B1A";
      this.rememberTheSteps.push(this.playerSteps);
      //SJekk her hvor pos til theTile er
      this.theActiveTilePositions(theTile);
      if (this.playerSteps > 1) {
        this.cleanTheLastTile(2);
      }
    } else if (this.playerSteps = 30) {
      console.log("you won!");
      this.cleanTheLastTile(1);

      //så tror du må løfte ut fjerne siste tile til funksjon
      document.getElementById('squareNumber100').style.backgroundColor = "#FF6B1A";
    }
  },
  playerMechanics: function () {
    let theRepeater; //we will use this variable to clear the setInterval()

    function stopAnimate() {
      clearInterval(theRepeater);
    } //end of stopAnimate()

    animateScript();

    function animateScript() {

      let theLastTile = document.getElementById('squareNumber' + boardMechanics.rememberTheSteps[boardMechanics.rememberTheSteps.length - 2]).getBoundingClientRect();

      const interval = 0; //100 ms of interval for the setInterval()

      //coordinates for the dude moving around
      let moveDudeLeft = theLastTile.left;
      let moveDudeTop = theLastTile.top;
      let moveDudeRight = theLastTile.right;
      let moveDudeBottom = theLastTile.bottom;

      theRepeater = setInterval(() => {
        var styles = {
          "backgroundPosition": `${theLastTile.top}px ${theLastTile.right} px`,
          "-webkit-transform": "scaleX(-1)",
          "transform": "scaleX(-1)",
          "left": `${moveDudeLeft}px`,
          "top": `${moveDudeTop}px`,
          "right": `${moveDudeRight}px`,
          "bottom": `${moveDudeBottom}px`
        };
        var obj = document.getElementById("theHeroImage");
        Object.assign(obj.style, styles);

        let theActiveTile = document.getElementById('squareNumber' + boardMechanics.rememberTheSteps[boardMechanics.rememberTheSteps.length - 1]).getBoundingClientRect();
        console.log(boardMechanics.rememberTheSteps.length - 1);
        let speedHorizontal = 2;
        let speedDiagonal = .5;

        //console.log((moveDudeLeft > theActiveTile.left) && !(moveDudeRight < theActiveTile.right));
        //console.log(moveDudeTop > theActiveTile.top);
        //console.log((moveDudeLeft < theActiveTile.left) && !(moveDudeRight > theActiveTile.right));

        if ((moveDudeLeft > theActiveTile.left) && !(moveDudeRight < theActiveTile.right)) {
          //console.log("go left");
          moveDudeLeft -= speedHorizontal;
          //console.log("moveDudeLeft: " + moveDudeLeft,"moveDudeRight: " + moveDudeRight,"moveDudeTOP: " + moveDudeTop,"theActiveTile.left: " + theActiveTile.left,"theActiveTile.right: " + theActiveTile.right,"theActiveTile.top: " + theActiveTile.top );

        } else if (moveDudeTop > theActiveTile.top) {
          //console.log("UP!");
          moveDudeLeft += speedHorizontal;
          moveDudeTop -= speedDiagonal;
        } else if ((moveDudeLeft < theActiveTile.left) && !(moveDudeRight > theActiveTile.right)) {
          //console.log("go right");
          moveDudeLeft += speedHorizontal;
          //console.log("moveDudeLeft: " + moveDudeLeft,"moveDudeRight: " + moveDudeRight,"moveDudeTOP: " + moveDudeTop,"theActiveTile.left: " + theActiveTile.left,"theActiveTile.right: " + theActiveTile.right,"theActiveTile.top: " + theActiveTile.top );

        }
        else if ((moveDudeLeft = theActiveTile.left)) {
          //console.log("else stop");
          stopAnimate();
          if ((boardMechanics.theGreenTilesBottom.includes(boardMechanics.playerSteps))) {
            console.log(boardMechanics.playerSteps);

            //boardMechanics.allLadders[name]
            function getKeyByValue(object, value) {
              return Object.keys(object).find(value => object[value] === key);
            }
            
            let theLadderObject = boardMechanics.allLadders[boardMechanics.playerSteps].topVerdi;
            let theTileToJumpTo = document.getElementById('squareNumber'+theLadderObject).getBoundingClientRect();
            document.getElementById("theHeroImage").style.top = theTileToJumpTo.top +"px";
            document.getElementById("theHeroImage").style.left= theTileToJumpTo.left +"px";
            boardMechanics.rememberTheSteps.push(theLadderObject);
            console.log(theLadderObject);
            let addTheUpSteps = theLadderObject - boardMechanics.playerSteps;
            boardMechanics.playerSteps += addTheUpSteps;
            console.log(boardMechanics.rememberTheSteps);
            console.log(boardMechanics.playerSteps);
          }
          //console.log("moveDudeLeft: " + moveDudeLeft,"moveDudeRight: " + moveDudeRight,"moveDudeTOP: " + moveDudeTop,"theActiveTile.left: " + theActiveTile.left,"theActiveTile.right: " + theActiveTile.right,"theActiveTile.top: " + theActiveTile.top );
        } else {
          stopAnimate();
          //console.log(" stop turd");
        }
      }, interval); //end of setInterval
    } //end of animateScript()
  }
};

boardMechanics.createTheBoard();

const button = document.querySelector('button');
button.addEventListener('click', event => {
  boardMechanics.rollTheDize();
});



