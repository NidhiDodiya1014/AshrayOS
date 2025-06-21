import react from "react";

export default function RoomChange() {
  return (
    <div className="room-change">
      <h1>Room Change Request</h1>
      <p>Please fill out the form below to request a room change.</p>
      <form>
        <label htmlFor="currentRoom">Current Room:</label>
        <input type="text" id="currentRoom" name="currentRoom" required />

        <label htmlFor="newRoom">New Room Preference:</label>
        <input type="text" id="newRoom" name="newRoom" required />

        <label htmlFor="reason">Reason for Change:</label>
        <textarea id="reason" name="reason" required></textarea>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}