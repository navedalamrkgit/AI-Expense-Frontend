import { useState } from "react";
import Tesseract from "tesseract.js";

import Layout from "../components/Layout";
import { addExpense } from "../services/expenseService";

function ReceiptScanner() {

    const [image, setImage] = useState(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    const scanReceipt = async () => {

        if (!image) {
            alert("Please select a receipt image.");
            return;
        }

        setLoading(true);

        try {

            const result = await Tesseract.recognize(image, "eng");

            const extractedText = result.data.text;

            setText(extractedText);

            const amounts = extractedText.match(/\d+\.\d{2}/g);

            let amount = 0;

            if (amounts) {

                amount = Math.max(...amounts.map(Number));

            }

            if (amount > 0) {

                await addExpense({

                    amount: amount,

                    category: "Food",

                    description: "Scanned Receipt",

                    expenseDate: new Date().toISOString().split("T")[0]

                });

                alert("Expense Added Successfully");

            }

        } catch (error) {

            console.log(error);

            alert("Receipt scan failed.");

        }

        setLoading(false);

    };

    return (

        <Layout>

            <div className="card">

                <div className="card-body">

                    <h2 className="fw-bold mb-4">
                        📄 AI Receipt Scanner
                    </h2>

                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImage}
                    />

                    <button
                        className="btn btn-primary mt-3"
                        onClick={scanReceipt}
                    >
                        Scan Receipt
                    </button>

                    {loading &&

                        <div className="text-center mt-4">

                            <div className="spinner-border text-primary"></div>

                            <p className="mt-3">
                                Reading receipt...
                            </p>

                        </div>

                    }

                    {text &&

                        <>

                            <h4 className="mt-4">
                                Extracted Text
                            </h4>

                            <textarea
                                rows="10"
                                className="form-control"
                                value={text}
                                readOnly
                            />

                        </>

                    }

                </div>

            </div>

        </Layout>

    );

}

export default ReceiptScanner;