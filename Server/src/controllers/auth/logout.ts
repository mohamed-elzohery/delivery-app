import asyncHandler from "../../middlewares/asyncHandler";

const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token_uid", { expires: new Date(0) });
  res.status(200).json();
});

export default logout;
