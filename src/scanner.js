var pills = [
  ["5449000265197", "54493957", "5760466976350", "1"],
  ["5030341502005", "96187159", "5000328987750", "2"],
  ["5000328490557", "5027952011835", "5016873018146", "3"],
  ["5618000593822", "5060055460155", "X001CRD8HP", "4"],
];
export const scanner = () => {
  while (pills.length != 0) {
    var barcode_1 = prompt();
    var barcode_2 = prompt();
    var barcode_3 = prompt();

    if (
      barcode_1 == pills[0][0] &&
      barcode_1 == pills[0][1] &&
      barcode_1 == pills[0][2]
    ) {
      console.log("Success, pill " + pills[0][3] + " complete");
      pills.splice(0, 1);
      continue;
    }
    console.log("Failure, try again");
  }
  console.log("All pills scanned, Well Done!");
};
