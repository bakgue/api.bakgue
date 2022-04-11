import { STATUS_CODE } from "./rootController";

export const postSaveAss = async (req, res) => {
  console.log("Controller : postSaveAss");
  return res.send({ a: "Hello" });
};

export const postCancelSaveAss = async (req, res) => {
  console.log("Controller : postCancelSaveAss");
  return res.sendStatus(STATUS_CODE.OK_CODE);
};
export const postCheckSaveAss = async (req, res) => {
  console.log("Controller : postCheckSaveAss");
  return res.sendStatus(STATUS_CODE.OK_CODE);
};

export const postAddView = async (req, res) => {
  console.log("Controller : postAddView");
  return res.sendStatus(STATUS_CODE.OK_CODE);
};
