import React from "react";
import CreateItemForm from "../components/CreateItemForm";

function CreateItemPage() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Tambah Item</h1>
            <CreateItemForm />
        </div>
    );
}

export default CreateItemPage;