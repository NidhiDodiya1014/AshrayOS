import react from "react";

export default function AddWarden() {
    return (
        <div className="AddWarden" style={{ color: "white" }}>
        <h1>Add a Warden</h1>
        <form action="http://localhost:5000/addWarden" method="post">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <br />
            <label htmlFor="id">ID:</label>
            <input type="number" id="id" name="id" required />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <br />
            <label htmlFor="Contact">Contact:</label>
            <input type="number" id="Contact" name="contact" required />
            <br />
            <button type="submit">Add Warden</button>
        </form>
        </div>
    );
}