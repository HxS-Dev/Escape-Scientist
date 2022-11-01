import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import clueBox from "../assets/media/box.png";
import completed from "../assets/media/Complete.png";
import insert from "../assets/media/Insert.png";
import loading from "../assets/media/Loading.mp4";

const getCompositionNumber = (latestPillCompleted) => {
  switch (latestPillCompleted) {
    case "Pill1":
      return "AH3763";
    case "Pill2":
      return "AH3764";
    case "Pill3":
      return "AH3765";
    default:
      return "AH3762";
  }
};

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

const Box = ({ topP }) => {
  var topV = "35vh";
  switch (topP) {
    case 2:
      topV = "55vh"; // 37
      break;
    case 3:
      topV = "72vh"; //56.5
      break;
    default:
      topV = "37vh";
      break;
  }
  return (
    <img
      src={clueBox}
      style={{
        left: "12.5vw",
        top: topV,
        height: "20vh",
        width: "75vw",
        position: "absolute",
      }}
    ></img>
  );
};

const IngredientPage = ({ base, substrate, catalyst, topP }) => {
  return (
    <div>
      <Box topP={topP} />
      <Ingredient label={"BASE:"} ingredient={base} />
      <Ingredient label={"SUBSTRATE:"} ingredient={substrate} />
      <Ingredient label={"CATALYST:"} ingredient={catalyst} />
    </div>
  );
};

const selectIngredientsPage = (latestPillCompleted, subPillCounter) => {
  switch (latestPillCompleted) {
    case "Pill1":
      return (
        <IngredientPage
          base={"Butyl Lithium"}
          substrate={"Mucous"}
          catalyst={"Anguis Cutis"}
          topP={subPillCounter}
        />
      );
    case "Pill2":
      return (
        <IngredientPage
          base={"Ethylene Glycol"}
          substrate={"Agave Shaka Zulu"}
          catalyst={"Potassium Ferricyanide"}
          topP={subPillCounter}
        />
      );
    case "Pill3":
      return (
        <IngredientPage
          base={"Benzoic Acid"}
          substrate={"Acacia Gum Powder"}
          catalyst={"4-Carbon Alkane"}
          topP={subPillCounter}
        />
      );
    default:
      return (
        <IngredientPage
          base={"Methanoic Acid"}
          substrate={"Nickel Sulfate"}
          catalyst={"Formaldehyde"}
          topP={subPillCounter}
        />
      );
  }
};

export const BarcodePage = ({
  pillError,
  latestPillCompleted,
  pillState,
  subPillCounter,
  pillCompletedUi,
}) => {
  const Ingredients = () =>
    selectIngredientsPage(latestPillCompleted, subPillCounter);
  // side effect to component where when subpillcounter is 3

  console.log({subPillCounter})
  console.log({pillError})
  console.log({latestPillCompleted})
  if (pillError && subPillCounter == 1) {
    return (
      <div>
        <h1 className="neon" data-text="U">
          <span className="flicker-fast">INC</span>ORRE
          <span className="flicker-slow">C</span>T
        </h1>
        <h1 style={{ marginTop: "200px" }} className="neon">
          CO<span className="flicker-slow">MPON</span>E
          <span className="flicker-fast">EN</span>TS
        </h1>
      </div>
    );
  }

  if (latestPillCompleted == "Pill4") {
    return <img src={completed} width={"100%"} height={"100%"} />;
  }

  if (pillCompletedUi == "insert") {
    return <img src={insert} width={"100%"} height={"100%"} />;
  }

  if (pillCompletedUi == "loading") {
    return (
      <video loop autoPlay width={"100%"} height={"100%"}>
        <source src={loading} />
      </video>
    );
  }

  if (pillCompletedUi == "complete") {
    return <img src={completed} width={"100%"} height={"100%"} />;
  }
  return (
    <div className="barcode-wrapper">
      <div className="composition">
        <h1 style={{ fontSize: "75px" }} className="composition-text">
          <strong>"XRAYOPHINE"</strong>
        </h1>
        <h1 className="composition-text">
          COMPOSITION#:{" "}
          <strong>{getCompositionNumber(latestPillCompleted)}</strong>
        </h1>
        <h1 className="composition-text">
          ATC CODE V: <strong>C01CA24</strong>
        </h1>
        <h1 className="composition-text">
          BATCH NUMBER: <strong>{new Date().toLocaleDateString()}</strong>
        </h1>
        ;
      </div>
      <Container>
        <div className="ingredient-wrapper">
          <Ingredients />
        </div>
      </Container>
    </div>
  );
};
