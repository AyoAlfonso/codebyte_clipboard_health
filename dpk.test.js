const {
  deterministicPartitionKey,
  MAX_PARTITION_KEY_LENGTH, TRIVIAL_PARTITION_KEY,
} = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partitionKey without modification when partitionKey is not a string ", () => {
    const obj = { partitionKey: [1, 2] };
    const trivialKey = deterministicPartitionKey(obj);
    expect(trivialKey).toBe("[1,2]");
  });

  it("Returns the hash when length is > 256 ", () => {
    const obj = {};
    obj.partitionKey = [];
    obj.partitionKey.length = 300;
    const trivialKey = deterministicPartitionKey(obj);
    expect(trivialKey).toBe(
      "75073e247addc2e278315dc0e56921611118b151764174a3b22bd828a2b076a2c27a868ea74743105fee90604e90f00bd48e975c16cb2f2108d40f458d123c7f"
    );
  });
  it(`Returns the 0 when length is < ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const obj = { partitionKey: "75073e247addc2e".repeat(15) };
    const trivialKey = deterministicPartitionKey(obj);
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });
});
