import React from "react";

export type AttributeCardProps = {
  name: string;
  count: string;
};

const AttributeCard = (props: AttributeCardProps) => {
  return (
    <aha-flex direction="column" justify-content="flex-end">
      <p style={{ textAlign: "end" }}>{props?.name ?? ""}</p>
      <p style={{ textAlign: "end", fontWeight: "bold", fontSize: "1rem", color: "#c0a0cf" }}>{props?.count ?? "0"}</p>
    </aha-flex>
  );
};

export default AttributeCard;
