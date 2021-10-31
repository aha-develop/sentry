import React from "react";

export type AttributeCardProps = {
  name: string;
  count: string;
};

const AttributeCard = (props: AttributeCardProps) => {
  return (
    <div style={{ backgroundColor: "var(--theme-tertiary-background)", flexGrow: 1, padding: '8px', borderRadius: '4px' }}>
      <aha-flex direction="column" style={{ backgroundColor: "var(--theme-tertiary-background)" }}>
        <div style={{ fontWeight: "bold", fontSize: "14px" }}>{props?.count ?? "0"}</div>
        <div style={{ fontSize: '12px', color: "var(--theme-tertiary-text)" }}>{props?.name ?? ""}</div>
      </aha-flex>
    </div>
  );
};

export default AttributeCard;
