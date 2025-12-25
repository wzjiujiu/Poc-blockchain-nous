function extractPolicyInfo(cleanedData) {
  const body = cleanedData.request?.body || {};

  const id = body["@id"] || body.id || null;

  const constraints =
    body.policy?.permission?.[0]?.constraint || [];

  const timeConstraints = constraints
    .filter(c => c.leftOperand === "POLICY_EVALUATION_TIME")
    .map(c => c.rightOperand);

  const time1 = timeConstraints[0] || null;
  const time2 = timeConstraints[1] || null;

  return { id, time1, time2 };
}

function extractContractDefinitionInfo(cleanedData) {
  const body = cleanedData?.request?.body;

  if (!body) {
    throw new Error("Request body mancante");
  }

  // 1️⃣ accessPolicyId
  const accessPolicyId = body.accessPolicyId
    ? body.accessPolicyId.toString()
    : null;

  // 2️⃣ contractPolicyId
  const contractPolicyId = body.contractPolicyId
    ? body.contractPolicyId.toString()
    : null;

  // 3️⃣ assetSelector (ASSET + operator + operandRight)
  let assetSelector = null;

  if (Array.isArray(body.assetsSelector) && body.assetsSelector.length > 0) {
    const criterion = body.assetsSelector[0];

    const operator = criterion.operator?.toString() || "";
    const operandRight = criterion.operandRight?.toString() || "";

    assetSelector = `ASSET${operator}${operandRight}`;
  }

  return [accessPolicyId, contractPolicyId, assetSelector];
}

module.exports = { extractPolicyInfo, extractContractDefinitionInfo };