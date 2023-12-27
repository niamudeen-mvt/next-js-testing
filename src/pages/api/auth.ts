import { NextApiRequest, NextApiResponse } from "next";
type ResponseData = {
  message: string;
};

export default function hanlder(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: "Hello from next js" });
}
