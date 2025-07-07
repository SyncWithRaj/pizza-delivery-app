import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import pizzaRoutes from "./routes/pizza.routes.js"
import ingredientRoutes from "./routes/ingredient.route.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import razorpayRoutes from "./routes/razorpay.route.js";
import adminRoutes from "./routes/admin.route.js";
import userRouter from "./routes/user.route.js"

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/admin", adminRoutes); // 👈 Mount admin routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/pizzas", pizzaRoutes);
app.use("/api/v1/ingredients", ingredientRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/razorpay", razorpayRoutes);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("🍕 Welcome to the Pizza Delivery API!");
});

export { app };
