import React, { useEffect, useState } from "react";
import knight from "./knight.png";
import targetimg from "./target.png"

const Chess = () => {
  const [first, setFirst] = useState([]);
  const [king, setking] = useState({});
  const [possiblemoves, setPossiblemoves] = useState([]);
  const [target, setTarget] = useState(null);
  const [kingid, setKingid] = useState(null);
  const [showinfo, setShowinfo] = useState(false);
  const [autoinfo, setAutoinfo] = useState([]);

  //   CHESSBOARD-
  // created chessboard with all the required details to complete the game
  // x and y are coordinates, king is knight's location, nextmove could be possible moves from current location
  // of knight
  const chessboard = [
    { x: 0, y: 0, king: false, nextmove: false, target: false, color: "white" },
    { x: 1, y: 0, king: false, nextmove: false, target: false, color: "black" },
    { x: 2, y: 0, king: false, nextmove: false, target: false, color: "white" },
    { x: 3, y: 0, king: false, nextmove: false, target: false, color: "black" },
    { x: 4, y: 0, king: false, nextmove: false, target: false, color: "white" },
    { x: 5, y: 0, king: false, nextmove: false, target: false, color: "black" },

    { x: 0, y: 1, king: false, nextmove: false, target: false, color: "black" },
    { x: 1, y: 1, king: false, nextmove: false, target: false, color: "white" },
    { x: 2, y: 1, king: false, nextmove: false, target: false, color: "black" },
    { x: 3, y: 1, king: false, nextmove: false, target: false, color: "white" },
    { x: 4, y: 1, king: false, nextmove: false, target: false, color: "black" },
    { x: 5, y: 1, king: false, nextmove: false, target: false, color: "white" },

    { x: 0, y: 2, king: false, nextmove: false, target: false, color: "white" },
    { x: 1, y: 2, king: false, nextmove: false, target: false, color: "black" },
    { x: 2, y: 2, king: false, nextmove: false, target: false, color: "white" },
    { x: 3, y: 2, king: false, nextmove: false, target: false, color: "black" },
    { x: 4, y: 2, king: false, nextmove: false, target: false, color: "white" },
    { x: 5, y: 2, king: false, nextmove: false, target: false, color: "black" },

    { x: 0, y: 3, king: false, nextmove: false, target: false, color: "black" },
    { x: 1, y: 3, king: false, nextmove: false, target: false, color: "white" },
    { x: 2, y: 3, king: false, nextmove: false, target: false, color: "black" },
    { x: 3, y: 3, king: false, nextmove: false, target: false, color: "white" },
    { x: 4, y: 3, king: false, nextmove: false, target: false, color: "black" },
    { x: 5, y: 3, king: false, nextmove: false, target: false, color: "white" },

    { x: 0, y: 4, king: false, nextmove: false, target: false, color: "white" },
    { x: 1, y: 4, king: false, nextmove: false, target: false, color: "black" },
    { x: 2, y: 4, king: false, nextmove: false, target: false, color: "white" },
    { x: 3, y: 4, king: false, nextmove: false, target: false, color: "black" },
    { x: 4, y: 4, king: false, nextmove: false, target: false, color: "white" },
    { x: 5, y: 4, king: false, nextmove: false, target: false, color: "black" },

    { x: 0, y: 5, king: false, nextmove: false, target: false, color: "black" },
    { x: 1, y: 5, king: false, nextmove: false, target: false, color: "white" },
    { x: 2, y: 5, king: false, nextmove: false, target: false, color: "black" },
    { x: 3, y: 5, king: false, nextmove: false, target: false, color: "white" },
    { x: 4, y: 5, king: false, nextmove: false, target: false, color: "black" },
    { x: 5, y: 5, king: false, nextmove: false, target: false, color: "white" },
  ];

  //   generate the x and y coordinates for king's and target finish location on first load
  useEffect(() => {
    const kingx = Math.floor(Math.random() * 4 + 1);
    const kingy = Math.floor(Math.random() * 4 + 1);
    // save ings x and y point in a state
    setking({ kingx, kingy });

    var targetx = Math.floor(Math.random() * 4 + 1);
    var targety = Math.floor(Math.random() * 4 + 1);
    setTarget({ targetx, targety }); // record target points coordinates

    // chnage coordinates if same,  target points coordinates
    if (kingx == targetx && kingy == targety) {
      var targetx = Math.floor(Math.random() * 4 + 1);
      var targety = Math.floor(Math.random() * 4 + 1);

      setTarget({ targetx, targety });
    }

    for (var i = 0; i < chessboard.length - 1; i++) {
      //  set king to true where the king's generated coordinates matches with chessboard x and y in array
      if (chessboard[i].x === kingx && chessboard[i].y === kingy) {
        chessboard[i].king = true;

        setKingid(i);
        setFirst(chessboard); // update chessboard for king
      }

      //  set target to true where the target's generated coordinates matches with chessboard x and y in array
      if (chessboard[i].x === targetx && chessboard[i].y === targety) {
        chessboard[i].target = true;
        setFirst(chessboard); // update chessboard for finish target
      }
    }
  }, []);

  // onhover on king find possible moves from current position
  const findmoves = () => {
    // Knights only possible movement on chessboard from one point in one step
    const nextx = [-1, -2, -1, -2, 1, 2, 1, 2];
    const nexty = [-2, -1, 2, 1, -2, -1, 2, 1];

    const possiblemoves = [];

    for (var i = 0; i < nextx.length; i++) {
      var nexta = nextx[i] + king.kingx;
      var nextb = nexty[i] + king.kingy;
      // neglect if the moves are outside chess board that are less than 0 and more than 5
      if (nexta > -1 && (nextb > -1) & (nexta < 6) && nextb < 6) {
        possiblemoves.push({
          nextx: nextx[i] + king.kingx,
          nexty: nexty[i] + king.kingy,
        });
      }
    }
    // save in a state for help button use
    setPossiblemoves(possiblemoves);
  };

  // validate the point for knight movement choosen by the user
  const chooseKing = (id, x, y) => {
    for (let i = 0; i < possiblemoves.length; i++) {
      if (possiblemoves[i].nextx == x && possiblemoves[i].nexty == y) {
        // if valid move make that point as king to update the kight colored div and others false
        setFirst(
          first.map((item, index) => {
            return index === id
              ? { ...item, king: true }
              : { ...item, king: false };
          })
        );
        // set new coordinated for kinng
        setking({ kingx: x, kingy: y });
        setKingid(id);
      }
    }
  };

  // generate new cordinates everytime knights location i updated
  useEffect(() => {
    findmoves();
  }, [king]);

  // if knights movement is valid and matches with coordinates of  target
  const checkKing = (x, y) => {
    console.log(x, y);
    for (let i = 0; i < possiblemoves.length; i++) {
      if (possiblemoves[i].nextx == x && possiblemoves[i].nexty == y) {
        console.log(possiblemoves[i].nextx, x);
        console.log(possiblemoves[i].nexty, y);
        alert("Great Work");
      }
    }
  };

  //   HELP BUTTON LOGIC

  const help = () => {
    // check if by anychance target's location is within possiblemoves array
    for (let m = 0; m < possiblemoves.length; m++) {
      if (
        possiblemoves[m].nextx == target.targetx &&
        possiblemoves[m].nexty == target.targety
      ) {
        return alert("Finish point is already in path");
      }
    }
    // generate more possible moves reachable from current possible moves one by one

    for (let i = 0; i < possiblemoves.length; i++) {
      console.log(`i am i ${i}`);
      let tempmoves = [];
      const nextx = [-1, -2, -1, -2, 1, 2, 1, 2];
      const nexty = [-2, -1, 2, 1, -2, -1, 2, 1];

      for (var j = 0; j < nextx.length; j++) {
        var nexta = nextx[j] + possiblemoves[i].nextx;
        var nextb = nexty[j] + possiblemoves[i].nexty;

        if (nexta > -1 && (nextb > -1) & (nexta < 6) && nextb < 6) {
          // save coordinates in new array
          tempmoves.push({
            nextx: nextx[j] + possiblemoves[i].nextx,
            nexty: nexty[j] + possiblemoves[i].nexty,
            atempx: possiblemoves[i].nextx,
            atempy: possiblemoves[i].nexty,
            i: i,
          });
        }
      }

      // check if the coordinates from tempmoves matches with target location

      for (let k = 0; k < tempmoves.length; k++) {
        if (
          tempmoves[k].nextx == target.targetx &&
          tempmoves[k].nexty == target.targety
        ) {
          // add new coordinated in possible moves

          setAutoinfo([tempmoves[k]]);
          console.log([tempmoves[k]]);
          // set the king as true for the required coordinates and make it seems to be moving
          setTimeout(function () {
            setFirst(
              first.map((item, index) => {
                console.log(item.x, tempmoves[k].atempx);
                return item.x == tempmoves[k].atempx &&
                  item.y == tempmoves[k].atempy
                  ? { ...item, king: true }
                  : { ...item, king: false };
              })
            );
            setTimeout(function () {
              setFirst(
                first.map((item, index) => {
                  console.log(item.x, tempmoves[k].atempx);
                  return item.x == tempmoves[k].nextx &&
                    item.y == tempmoves[k].nexty
                    ? { ...item, king: true }
                    : { ...item, king: false };
                })
              );
            }, 1000);
          }, 1000);

          // show the steps user can use to react king
          return setShowinfo(true);
        }
      }
    }
  };

  return (
    <div className="App">
      <h1 className=""> Knight Chess Game</h1>
      <div>
        <h3 onClick={help} style={{cursor:"pointer"}}>
          Need Help? Please refresh if nothing shows up on clicking
        </h3>
        {showinfo && (
          <div>
         
          </div>
        )}
      </div>

      <div className="chessboard">
        {first.map((ele, index) => {
          return (
            <div key={index}>
              {/* render div with yellow color if king is true */}
              {ele.king ? (
                <>
                  {/* if king is true this div will render */}
                  <div
                    className="box"
                    style={{ backgroundColor: "gold", color: "white", fontSize:"20px" }}
                    onMouseOver={() => {
                      findmoves();
                    }}
                  >
                   <img style={{width:"100px", height:"100px"}} src={knight}alt="knight" />
                   
                  </div>
                </>
              ) : (
                <>
                  {/* if king is false this div will render */}
                  {/* render div with red color if finish target location is true */}
                  {ele.target ? (
                    <div
                      className="box"
                      style={{ backgroundColor: `Red`, color: "white",  fontSize:"20px"  }}
                      onClick={() => checkKing(ele.x, ele.y)}
                    >
                    <img style={{width:"100px", height:"100px"}} src={targetimg}alt="knight" />
                    </div>
                  ) : (
                    //     {/* render normal div with specified color if no its not target */}

                    <>
                      <div
                        className="box"
                        style={{
                          backgroundColor: `${ele.color}`,
                          color: "blue",
                        }}
                        onClick={() => chooseKing(index, ele.x, ele.y)}
                      >
                     
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chess;
