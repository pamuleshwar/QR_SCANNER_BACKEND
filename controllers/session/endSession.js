import { Session } from "../../models/session.js";

export const endSession = async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      const session = await Session.findByIdAndUpdate(
        sessionId,
        { status: 'completed', endTime: new Date() },
        { new: true }
      );
  
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }


      //remove the token from cookies
      res.cookie("token", null, {maxAge : 0});
      
      res.json({ message: 'Session ended successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };