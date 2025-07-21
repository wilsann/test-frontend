import React from "react";
import EditItemForm from "../components/EditItemForm";

function EditItemPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Edit Item</h1>
      <EditItemForm />
    </div>
  );
}

export default EditItemPage;