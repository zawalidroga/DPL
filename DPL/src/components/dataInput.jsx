import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const DataInput = () => {
  const [tablesNumb, setTableNumb] = useState(0);
  const [peopleNumb, setPeopleNumb] = useState(0);
  const [roundNumb, setRoundNumb] = useState(0);
  const [people, setPeople] = useState([]);
  const [clicksNumb, setClicksNumb] = useState(0);
  const titles = ["Liczba stołów", "Liczba ludzi", "Liczba rund", "WYNIKI"];

  const pplMaker = (pplNumb) => {
    const arr = [];
    for (let i = 0; i < pplNumb; i++) {
      arr.push({
        index: i,
        name: i,
        tablesHistory: [],
        peopleHistory: [],
      });
    }
    return arr;
  };

  const btn = {
    inputValue: function (e) {
      switch (clicksNumb) {
        case 0:
          setTableNumb(e);
          break;
        case 1:
          setPeopleNumb(e);
          break;
        case 2:
          setRoundNumb(e);
          break;
      }
    },
    mainRandomize: () => {
      const pplLocal = pplMaker(peopleNumb);
      const sameElementsChecker = (arr1, arr2) => {
        for (let i = 0; i < arr1.length; i++) {
          if (arr2.filter((e) => e === arr1[i]).length === 2) {
            return false;
          }
        }
        return true;
      };
      for (let r = 0; r < roundNumb; r++) {
        const pplAtTables = [];
        const pplIndexes = [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
          37, 38, 39, 40, 41,
        ];
        for (let z; z < peopleNumb; z++) {
          pplIndexes.push(z);
        }
        console.log(pplIndexes);
        for (let t = 0; t < tablesNumb; t++) {
          pplAtTables.push([]);
          for (let i = 0; i < 6; i++) {
            let rndPersonIndex;
            let alarmCounter;
            do {
              rndPersonIndex =
                pplIndexes[Math.floor(Math.random() * pplIndexes.length)];
                alarmCounter++
                if(alarmCounter > pplLocal.length + 1)
            } while (
              pplLocal[rndPersonIndex].tablesHistory.filter((e) => e === t)
                .length !== 0 ||
              !sameElementsChecker(
                pplAtTables[t],
                pplLocal[rndPersonIndex].peopleHistory
                ||

              )
            );
            if (
              pplLocal[rndPersonIndex].tablesHistory.filter((e) => e === t)
                .length === 0 &&
              sameElementsChecker(
                pplAtTables[t],
                pplLocal[rndPersonIndex].peopleHistory
              )
            ) {
              pplLocal[rndPersonIndex].tablesHistory.push(t);
              pplAtTables[t].push(rndPersonIndex);
              pplIndexes.splice(pplIndexes.indexOf(rndPersonIndex), 1);
              if (i === 6) {
                pplLocal[rndPersonIndex].peopleHistory = pplLocal[
                  rndPersonIndex
                ].peopleHistory.concat(pplAtTables[t]);
              }
            }
          }
        }
      }

      setPeople(pplLocal);
    },

    listener: function () {
      if (clicksNumb > 2) {
        btn.mainRandomize();
      } else {
        setClicksNumb((prevClicks) => prevClicks + 1);
        console.log(tablesNumb, peopleNumb, roundNumb, clicksNumb);
      }
    },
  };

  useEffect(() => {
    console.log(people);
  }, [people]);

  return (
    <Container>
      <h3>{titles[clicksNumb]}</h3>
      <div>
        <input
          type="number"
          alt="000"
          onInput={(e) => btn.inputValue(e.target.value)}
        ></input>
      </div>
      <button onClick={btn.listener}>Dalej</button>
      <button onClick={() => console.log(btn, titles[btn.clicksNumb])}>
        test
      </button>
      <div>
        {people.map((person) => {
          return (
            <div key={person.index}>
              <h2>Person nr: {person.index}</h2>
              <p>
                tables:{" "}
                {person.tablesHistory.map((e) => {
                  return e;
                })}
              </p>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default DataInput;
