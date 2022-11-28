import React, {useState, useEffect} from "react";
import Timer from "./components/Timer";

function App() {
    return (
        <main className="h-screen bg-slate-800 text-gray-100 p-14 text-center relative">
            <Timer />
        </main>
    );
}

export default App;
