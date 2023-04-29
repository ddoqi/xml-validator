/*
validator's isValidXML function receives a string, checks if a string is a valid xml, and returns a boolean.

<a /> => true
<a></a> => true
<a>test</a> => true
<a><b></b></a> => true
<a></a><b></b> => true

<a> => false
<<a></a> => false
<a><b></a></b> => false

IMPORTANT: Please note that we have our own internal rules about validity.
1. A node cannot contain a node with the same tag. ex) <a><a></a></a> => false
2. A node cannot be followed by a node with the same tag. ex) <a></a><a></a> => false
3. An xml cannot be more than 2 levels deep. ex) <a><b><c><d></d></c></b></a> => false

IMPORTANT: Feel free to use any open source libraries you find necessary. You can use xml parsing libraries as well.
IMPORTANT: Don't worry about XML declaration, node attributes, or unicode characters.

For further examples, please check basic_spec.js file.

DO NOT MODIFY
*/

/*
@param xmlString: a string, possibly a valid xml string
@return boolean;
*/

const libxmljs = require("libxmljs");

const isValidXML = (xmlString) => {
  if (!xmlString) {
    return false;
  }

  try {
    const xmlDoc = libxmljs.parseXml(xmlString);

    const rootNodeName = xmlDoc.root().name();

    const isConsecutive =
      xmlDoc.find(`//${rootNodeName}/following-sibling::${rootNodeName}`)
        .length > 0;

    const hasDuplicate =
      xmlDoc.find(
        `//*[count(. | //${rootNodeName}) = count(//${rootNodeName})]`
      ).length > 1;

    const isDeep = xmlDoc.find("//*/*").length > 1;

    return !(isConsecutive || hasDuplicate || isDeep);
  } catch (e) {
    return false;
  }
};

module.exports = { isValidXML };

// -------------------------------------------
// const libxmljs = require("libxmljs");

// const isValidXML = (xmlString) => {
//   if (!xmlString) {
//     return false;
//   }

//   try {
//     // xml을 파싱하여 xml 문서 객체로 생성
//     const xmlDoc = libxmljs.parseXml(xmlString);

//     const rootNodeName = xmlDoc.root().name();

//     // XPath 쿼리를 이용해서 루트 노드의 다음 형제 요소가 루트 노드와 같은지를 검사한다.
//     const isConsecutive =
//       xmlDoc.find(`//${rootNodeName}/following-sibling::${rootNodeName}`)
//         .length > 0;

//     // 같은 이름을 가진 노드가 있는지를 확인
//     const hasDuplicate =
//       xmlDoc.find(
//         `//*[count(. | //${rootNodeName}) = count(//${rootNodeName})]`
//       ).length > 1;

//     const isDeep = xmlDoc.find("//*/*").length > 1;

//     return !(isConsecutive || hasDuplicate || isDeep);
//   } catch (e) {
//     return false;
//   }
// };

// module.exports = { isValidXML };
