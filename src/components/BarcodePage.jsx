import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import clueBox from "../assets/media/box.png";

const Ingredient = ({ label, ingredient }) => {
  return (
    <Row className="ingredient">
      <Col>
        <h1 className="ingredient-label">{label}</h1>
      </Col>
      <Col className="ingredient-col">
        <h1 className="ingredient-text">{ingredient}</h1>
      </Col>
    </Row>
  );
};

const IngredientPage = ({ base, substrate, catalyst }) => {
  return (
    <div>
      <img
        src={clueBox}
        style={{ height: "25vh", width: "75vw", position: "absolute" }}
      ></img>
      <Ingredient label={"BASE:"} ingredient={base} />
      <Ingredient label={"SUBSTRATE:"} ingredient={substrate} />
      <Ingredient label={"CATALYST:"} ingredient={catalyst} />
    </div>
  );
};

const selectIngredientsPage = (latestPillCompleted) => {
  switch (latestPillCompleted) {
    case "pill1":
      return (
        <IngredientPage
          base={"Butyl Lithium (6383587)"}
          substrate={"Mucous (1530478)"}
          catalyst={"Capulus Seminibus (3301546)"}
        />
      );
    case "pill2":
      return (
        <IngredientPage
          base={"Ethylene Glycol (4450546)"}
          substrate={"Agave Shaka Zulu (7632618)"}
          catalyst={"Potassium Ferricyanide (8752056)"}
        />
      );
    case "pill3":
    case "pill4":
      return (
        <IngredientPage
          base={"Benzoic Acid (3248916)"}
          substrate={"Acacia Gum Powder (3663714)"}
          catalyst={"4-Carbon Alkane (Butane) (9338264)"}
        />
      );
    default:
      return (
        <IngredientPage
          base={"Methanoic Acid (8555358)"}
          substrate={"Nickel Sulfate (8900661)"}
          catalyst={"Formaldehyde (4913251)"}
        />
      );
  }
};

export const BarcodePage = ({ isError, latestPillCompleted, pillState }) => {
  const Ingredients = () => selectIngredientsPage(latestPillCompleted);
  // useEffect(() => {
  //   console.log("hello");
  // }, [showClue]);
  console.log({ latestPillCompleted }, { pillState });
  // const [test, setTest] = useState(false);
  return (
    <div className="barcode-wrapper">
      <Container>
        <div className="ingredient-wrapper">
          <Ingredients />
        </div>
      </Container>
      {/* <button onClick={() => setTest((prev) => !prev)}>Barcode</button>; */}
    </div>
  );
};
