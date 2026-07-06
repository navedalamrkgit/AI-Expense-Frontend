import api from "./api";
import { createNotification } from "./notificationService";

export const getBudget = () => api.get("/budget");

export const saveBudget = async (budget) => {
    const response = await api.post("/budget", budget);

    try {
        const month = budget.month || "current";
        const year = budget.year || "";
        const amount = budget.monthlyBudget || 0;
        const message = year
            ? `Budget created for ${month}/${year} with amount ₹${amount}`
            : `Budget created for ${month} with amount ₹${amount}`;

        await createNotification(message, "SUCCESS");
    } catch (notificationError) {
        console.error("Failed to create notification", notificationError);
    }

    return response;
};

export const updateBudget = async (budget) => {
    const response = await api.put("/budget", budget);

    try {
        const month = budget.month || "current";
        const year = budget.year || "";
        const amount = budget.monthlyBudget || 0;
        const message = year
            ? `Budget updated for ${month}/${year} with amount ₹${amount}`
            : `Budget updated for ${month} with amount ₹${amount}`;

        await createNotification(message, "SUCCESS");
    } catch (notificationError) {
        console.error("Failed to create notification", notificationError);
    }

    return response;
};

export const getSpent = () => api.get("/budget/spent");

export const getRemaining = () => api.get("/budget/remaining");

export const getUsage = () => api.get("/budget/usage");