import { Scan } from "../../models/scan.js";

export const exportScans = async (req, res) => {
    try {
      const { sessionId } = req.params;

      const scans = await Scan.find({ sessionId });
  
      // convert to csv
      const header = 'Code,Status,Timestamp\n';

      const csvData = scans.map(scan => 
        `"${scan.codeValue}",${scan.status},"${scan.timestamp}"`
      ).join('\n');
  
      res.setHeader('Content-Type', 'text/csv');

      res.setHeader('Content-Disposition', `attachment; filename=scans-${sessionId}.csv`);
      
      res.send(header + csvData);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };