const crypto = require("crypto");

//placed this outside the funtion so that we can export it for us
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  let candidate;
  //DRY CODE. Turned repetitions into an arrow Function
  const createHash = (data) =>
    crypto.createHash("sha3-512").update(data).digest("hex");

  // Cleaner decision tree here with ternary operators
  if (event) {
    candidate = event?.partitionKey
      ? event.partitionKey
      : createHash(JSON.stringify(event));
  }

  candidate =
    candidate && typeof candidate !== "string"
      ? JSON.stringify(candidate)
      : TRIVIAL_PARTITION_KEY;

  if (candidate.length > MAX_PARTITION_KEY_LENGTH)
    candidate = createHash(candidate);

  return candidate;
};
exports.TRIVIAL_PARTITION_KEY = TRIVIAL_PARTITION_KEY;
exports.MAX_PARTITION_KEY_LENGTH = MAX_PARTITION_KEY_LENGTH;
