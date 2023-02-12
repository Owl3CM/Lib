import React from "react";
import { JsonToView } from "../NodeBuilder";

const Error = ({ service }) => {
    const error = service.state.error;
    return (
        <div
            onClick={({ target }) => {
                if (service.reload) service.reload();
                else service.setState("none");
            }}
            className="fixed bg-blur inset-0 justify-center col z-50 blur-bg overflow-auto">
            <div className="col-center">
                {error ? (
                    <JsonToView json={error.stack ? { message: error.message, stack: error.stack } : error} />
                ) : (
                    <JsonToView json={{ error: "No Details" }} />
                )}
                <p className="text-white text-center animate-bounce rounded-full font-bold bg-red" style={{ padding: "0px 30px", opacity: 0.7 }}>
                    Error!
                </p>
            </div>
        </div>
    );
};

export default Error;
