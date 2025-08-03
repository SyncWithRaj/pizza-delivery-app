import cron from "node-cron";
import { Ingredient } from "../models/ingredient.model.js";
import { sendMail } from "../utils/mailer.util.js";

export const monitorIngredientStock = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("🔍 Checking ingredient stock levels...");

    try {
      const lowStockIngredients = await Ingredient.find({ stock: { $lte: 20 } });

      if (lowStockIngredients.length > 0) {
        const ingredientList = lowStockIngredients
          .map(i => `${i.name}: ${i.stock} units`)
          .join("\n");

        await sendMail(
          "rajr127655@gmail.com",
          "⚠️ Low Stock Alert - Ingredients",
          `The following ingredients have low stock:\n\n${ingredientList}`
        );

        console.log("📧 Low stock alert email sent.");
      } else {
        console.log("✅ All ingredient stocks are sufficient.");
      }
    } catch (err) {
      console.error("❌ Error checking stock levels:", err.message);
    }
  });
};
