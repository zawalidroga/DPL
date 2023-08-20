import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const DataInput = () => {
  const [tablesNumb, setTableNumb] = useState("000");
  const [peopleNumb, setPeopleNumb] = useState(0);
  const [roundNumb, setRoundNumb] = useState(0);
  const [people, setPeople] = useState([]);
  const [inputValue, setInputValue] = useState("000");
  const titles = ["Liczba stołów", "Liczba ludzi", "Liczba rund"];

  const [btn, setBtn] = useState({
    txt: "dalej",
    clicksNumb: 0,
    inputValue: (e) => {
      switch (this.clicksNumb) {
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
      for (let i = 0; i < 5; i++) {
        setPeople((prevArr) => {
          [
            ...prevArr,
            {
              name: i,
              table: [],
              partners: [],
            },
          ];
        });
      }
    },

    listener: () => {
      setInputValue("000");
      if (btn.clicksNumb === 2) {
        console.log(btn.clicksNumb);
        btn.mainRandomize();
        btn.clicksNumb = 0;
      } else {
        btn.clicksNumb++;
      }
      console.log(people);
    },
  });
  return (
    <Container>
      <h3>{titles[btn.clicksNumb]}</h3>
      <div>
        <input
          type="number"
          value={inputValue}
          onInput={(e) => btn.inputValue(e)}
        ></input>
      </div>
      <button onClick={btn.listener}>Dalej</button>
      <button onClick={() => console.log(btn, titles[btn.clicksNumb])}>
        test
      </button>
    </Container>
  );
};

export default DataInput;
