import { Parser } from "json2csv";

export const downloadResource = (
  res: any,
  fileName: string,
  data: any,
  fields?: any
) => {
  const json2csv = new Parser({ fields });
  const csv = json2csv.parse(data);
  res.header("Content-Type", "text/csv");
  res.attachment(fileName);
  return res.send(csv);
};
