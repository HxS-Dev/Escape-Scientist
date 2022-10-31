import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import clueBox from "../assets/media/box.png";
import completed from "../assets/media/Complete.png";

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
      topV = "48vh";
      break;
    case 3:
      topV = "63vh";
      break;
    default:
      topV = "35vh";
      break;
  }
  return (
    <img
      src={clueBox}
      style={{
        left: "10vw",
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
  console.log({ subPillCounter }, "test");
  switch (latestPillCompleted) {
    case "Pill1":
      return (
        <IngredientPage
          base={"Butyl Lithium (6383587)"}
          substrate={"Mucous (1530478)"}
          catalyst={"Capulus Seminibus (3301546)"}
          topP={subPillCounter}
        />
      );
    case "Pill2":
      return (
        <IngredientPage
          base={"Ethylene Glycol (4450546)"}
          substrate={"Agave Shaka Zulu (7632618)"}
          catalyst={"Potassium Ferricyanide (8752056)"}
          topP={subPillCounter}
        />
      );
    case "Pill3":
      return (
        <IngredientPage
          base={"Benzoic Acid (3248916)"}
          substrate={"Acacia Gum Powder (3663714)"}
          catalyst={"4-Carbon Alkane (Butane) (9338264)"}
          topP={subPillCounter}
        />
      );
    default:
      return (
        <IngredientPage
          base={"Methanoic Acid (8555358)"}
          substrate={"Nickel Sulfate (8900661)"}
          catalyst={"Formaldehyde (4913251)"}
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
}) => {
  const Ingredients = () =>
    selectIngredientsPage(latestPillCompleted, subPillCounter);
  console.log(subPillCounter, pillError);
  // need an update every scan and error state too only after 3 scans

  // side effect to component where when subpillcounter is 3

  if (pillError && subPillCounter == 1) {
    return (
      <div>
        <h1 className="neon" data-text="U">
          SYNTHE<span className="flicker-slow">SIZ</span>ATION
        </h1>
        <h1 style={{ marginTop: "200px" }} className="neon">
          <span className="flicker-fast">ER</span>ROR
        </h1>
      </div>
    );
  }

  if (latestPillCompleted == "Pill4") {
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
