import axios from "axios";

const expensesModule = {};

expensesModule.postData = async (formData) => {
  const response = await axios.post("/api/expenses", {
    amount: formData.amount,
    category: formData.category,
    date: formData.date,
    description: formData.description,
  });

  return response.status_code;
};

export default expensesModule;
