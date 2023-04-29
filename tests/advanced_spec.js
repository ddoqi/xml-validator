// TODO: Add tests that you find necessary.

const { isValidXML } = require("../src");

describe("advanced validator test", () => {
  it("should return true for a valid XML with multiple levels of nested nodes", () => {
    expect(isValidXML("<a><b><c></c></b></a>")).toBeTruthy();
  });

  it("should return false for an XML with nested nodes that violate Vingle's rule 1", () => {
    expect(isValidXML("<a><a></a></a>")).toBeFalsy();
  });

  it("should return false for an XML with consecutive nodes that violate Vingle's rule 2", () => {
    expect(isValidXML("<a></a><a></a>")).toBeFalsy();
  });

  it("should return false for an XML with a depth of more than 2 that violate Vingle's rule 3", () => {
    expect(isValidXML("<a><b><c><d></d></c></b></a>")).toBeFalsy();
  });

  it("should return false for an XML with an incomplete node", () => {
    expect(isValidXML("<a></a><b>")).toBeFalsy();
  });

  it("should return false for an XML with mismatched opening and closing tags", () => {
    expect(isValidXML("<a><b></a></b>")).toBeFalsy();
  });

  it("should return false for an XML with invalid characters", () => {
    expect(isValidXML("<a>&</a>")).toBeFalsy();
  });

  it("should return false for an XML with attributes containing invalid characters", () => {
    expect(isValidXML("<a b=" & "></a>")).toBeFalsy();
  });
});
