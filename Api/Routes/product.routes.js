import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllPProduct,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/createProduct").post(createProduct);
router.route("/getAllProduct").get(getAllPProduct);
router.route("/getOneProduct/:id").get(getProductById);
router.route("/updateProduct/:id").put(updateProduct);
router.route("/deleteProduct/:id").delete(deleteProduct);

export default router;
