import { convertStrToDate } from "@helpers/convertStrToDate";
import _ from "lodash";
import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import moment from "moment";
import Select from "./Select";

export type AttributeChartProps = {
  stats: ISentryStats;
};

type RangeType = keyof ISentryStats;

const SelectRangeOptions = [
  { label: "Last 30 days", value: "30d" },
  { label: "Last 24 hours", value: "24h" },
];

const renderCustomToolTip = ({ active, payload, label }) => {
  const data = _.get(payload, "0.payload", {});
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: "#c9c9c9", borderRadius: "5px", opacity: "0.6", padding: "5px" }}>
        <p>{data?.fullName ?? ""}</p>
        <p style={{ marginBottom: "0px" }}>Count: {data?.value ?? ""}</p>
      </div>
    );
  }

  return null;
};

const AttributeChart = ({ stats }: AttributeChartProps) => {
  const [range, setRange] = React.useState<RangeType>("24h");

  const data = stats[range].map(([timeStamp, count], index) => {
    const date = moment(timeStamp * 1000);
    return {
      name: range === "24h" ? `${index}h` : `${date.format("D")}d`,
      fullName: range === "24h" ? `Hour: ${date.format("HH:mm:ss")}` : `Date: ${date.format("MMM DD YYYY")}`,
      value: count,
    };
  });

  return (
    <div style={{ padding: "5px", border: "1px solid #d3d3d3", borderRadius: "5px" }}>
      <div>
        <Select options={SelectRangeOptions} onChange={(val) => setRange(val as any)} value={range} />
      </div>
      <BarChart barSize={10} width={430} height={250} data={data}>
        <CartesianGrid strokeDasharray="4" />
        <XAxis dataKey="name" interval={4} />
        <Tooltip content={renderCustomToolTip} />
        <Bar minPointSize={3} dataKey="value" fill="#c0a0cf" />
      </BarChart>
    </div>
  );
};

export default AttributeChart;
