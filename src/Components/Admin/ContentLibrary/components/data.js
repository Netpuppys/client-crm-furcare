// const anesthesiaPatientMonitoringData = `
// <h2> Anesthesia & Surgery</h2>
// <br/>
// <h3>Anesthesia Administration and Monitoring</h3>

// <h4>PATIENT ASA STATUS (I-V):</h4>
// <h4>PREOPERATIVE PAIN ASSESSMENT (0-4):</h4>
// <h4>ANESTHETIC PROTOCOL UTILIZED:</h4>
// <br/>
// <h4>PREMEDICATIONS ADMINISTERED:</h4>
// <ul>
//     <li>
//         <p><strong>Medication:</strong></p>
//         <p>Concentration (mg/mL):</p>
//         <p>Quantity (mL):</p>
//         <p>Route:</p>
//         <p>Time administered:</p>
//         <p>Administered by:</p>
//     </li>
//     <li>
//         <p><strong>Medication:</strong></p>
//         <p>Concentration (mg/mL):</p>
//         <p>Quantity (mL):</p>
//         <p>Route:</p>
//         <p>Time administered:</p>
//         <p>Administered by:</p>
//     </li>
//     <li>
//         <p><strong>Medication:</strong></p>
//         <p>Concentration (mg/mL):</p>
//         <p>Quantity (mL):</p>
//         <p>Route:</p>
//         <p>Time administered:</p>
//         <p>Administered by:</p>
//     </li>
// </ul>
// <br/>
// <h4>PREINDUCTION EVALUATION:</h4>
// <ul>
//   <li>Time:</li>
//   <li>Temp:</li>
//   <li>HR:</li>
//   <li>RR:</li>
//   <li>Pulse quality:</li>
//   <li>Other physical examination changes:</li>
//   <li>Sedation level: none / mild / adequate / excessive / dysphoric</li>
// </ul>
// <br/>
// <h4>IV CATHETER:</h4>
// <ul>
//   <li>Size (gauge):</li>
//   <li>Right cephalic: ____</li>
//   <li>Left cephalic: ____</li>
//   <li>Right medial saphenous: ____</li>
//   <li>Left medial saphenous: ____</li>
//   <li>Right lateral saphenous: ____</li>
//   <li>Left Lateral Saphenous: ____</li>
//   <li>Other: ____</li>
// </ul>
// <br/>
// <h4>EQUIPMENT:</h4>
// <ul>
//   <li>Anesthesia Machine Checklist completed: ____ Yes ____ No</li>
//   <li>Breathing circuit:</li>
//   <ul>
//     <li>Non-rebreathing (&lt;7kg): ____</li>
//     <li>Rebreathing (&gt;7kg): Adult ____ Pediatric ____</li>
//     <li>Bag size (L): ____</li>
//   </ul>
// </ul>
// <br/>
// <hr />
// <br/>
// <h2>INDUCTION AND INTUBATION PHASE:</h2>
// <ul>
//   <li>Preoxygenation administered: ____ Yes ____ No</li>
//   <li>If yes, record rate (L/min): ____</li>
//   <li>Method (flow by, mask, etc.): ____</li>
//   <li>Length of time (minutes): ____</li>
//   <li>Endotracheal tube size: ____ mm</li>
//   <li>Cuff inflated for leak test: ____ Yes ____ No</li>
// </ul>
// <br/>
// <h4>IV induction agent and concentration:</h4>
// <ul>
//   <li>Quantity:</li>
//   <li>Time:</li>
//   <li>Administered by:</li>
// </ul>
// <br/>
// <hr />
// <br/>
// <h3>LOCAL AND REGIONAL BLOCKS (as medically indicated or required):</h3>
// <ol>
//   <li>
//     <strong>Medication:</strong><br />
//     Concentration (mg/mL):<br />
//     Quantity (mL):<br />
//     Route:<br />
//     Time administered:<br />
//     Administered by:
//   </li>
// </ol>
// <br/>
// <hr />
// <br/>
// <h2>MAINTENANCE / MONITORING</h2>
// <table>
//   <thead>
//     <tr>
//       <th>Time</th>
//       <th>Sevo %</th>
//       <th>O2 Flow</th>
//       <th>Fluids (mL/hr)</th>
//       <th>HR</th>
//       <th>RR</th>
//       <th>Pulse quality</th>
//       <th>CRT/MM</th>
//       <th>Temp</th>
//       <th>SpO2</th>
//       <th>ECG rhythm</th>
//       <th>EtCO2</th>
//       <th>SAP</th>
//       <th>DAP</th>
//       <th>MAP</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//     </tr>
//   </tbody>
// </table>
// <br/>
// <h4>Interventions or remarks (including time):</h4>
// <ul>
//   <li>Procedure/surgery start time:</li>
//   <li>Procedure end time:</li>
//   <li>Inhalant anesthesia end time:</li>
//   <li>100% O2 end time:</li>
//   <li>Total fluids administered during anesthesia:</li>
// </ul>
// <br/>
// <hr />
// <br/>
// <h4>PERIOPERATIVE MEDICATIONS ADMINISTERED:</h4>
// <ol>
//   <li>
//     <strong>Medication:</strong><br />
//     Concentration (mg/mL):<br />
//     Quantity (mL):<br />
//     Route:<br />
//     Time administered:<br />
//     Administered by:
//   </li>
// </ol>
// <br/>
// <hr />
// <br/>
// <p>... (Content truncated for brevity) ...</p>
// <br/>
// <hr />
// <br/>
// <h2>Canine Castration</h2>
// <ul>
//   <li>Surgical site shaved and prepped with surgical scrub and alcohol.</li>
//   <li>Ventral midline incision cranial to scrotum.</li>
//   <li>Removed testicles as follows:</li>
//   <li>Subcutaneous closure as follows:</li>
//   <li>Skin closure as follows:</li>
//   <li>Suture material utilized:</li>
//   <li>Surgical complications noted or additional remarks:</li>
// </ul>
// <br/>
// <hr />
// <br/>
// <h2>Canine Spay - Ovariohysterectomy</h2>
// <ul>
//   <li>Surgical site shaved and prepped with surgical scrub and alcohol.</li>
//   <li>____ cm ventral midline incision.</li>
//   <li>Ovaries and uterus excised and pedicles ligated as follows:</li>
//   <li>Closure of linea alba as follows:</li>
//   <li>Subcutaneous closure as follows:</li>
//   <li>Skin closure as follows:</li>
//   <li>Suture material utilized:</li>
// </ul>
// <br/>
// <hr />
// <br/>
// <h2>Dental Prophylaxis</h2>
// <ul>
//   <li>All teeth scaled with an ultrasonic scaler, all teeth polished with prophy paste.</li>
//   <li>Examination of the oral cavity completed by the veterinarian including assessment of all teeth with a dental probe.</li>
// </ul>
// <br/>
// <h4>Dental Chart:</h4>
// <ul>
//   <li>Calculus (0-4)</li>
//   <li>Gingivitis (0-4)</li>
//   <li>Periodontal Disease (0-4)</li>
// </ul>
// <br/>
// <hr />
// <br/>
// <h2>Feline Castration</h2>
// <ul>
//   <li>Surgical site prepared and prepped with surgical scrub and alcohol.</li>
//   <li>Scrotal incision made over each testicle.</li>
//   <li>Testicular vessels and cord ligated as follows:</li>
//   <li>Surgical complications noted or additional remarks:</li>
// </ul>
// <br/>
// <hr />`

export const anesthesiaPatientMonitoringData = `<h2>Anesthesia &amp; Surgery</h2><p><br></p><h3>Anesthesia Administration and Monitoring</h3><h4>PATIENT ASA STATUS (I-V):</h4><h4>PREOPERATIVE PAIN ASSESSMENT (0-4):</h4><h4>ANESTHETIC PROTOCOL UTILIZED:</h4><p><br></p><h4>PREMEDICATIONS ADMINISTERED:</h4><ul><li><strong>Medication:</strong></li><li>Concentration (mg/mL):</li><li>Quantity (mL):</li><li>Route:</li><li>Time administered:</li><li>Administered by:</li><li><strong>Medication:</strong></li><li>Concentration (mg/mL):</li><li>Quantity (mL):</li><li>Route:</li><li>Time administered:</li><li>Administered by:</li><li><strong>Medication:</strong></li><li>Concentration (mg/mL):</li><li>Quantity (mL):</li><li>Route:</li><li>Time administered:</li><li>Administered by:</li></ul><p><br></p><h4>PREINDUCTION EVALUATION:</h4><ul><li>Time:</li><li>Temp:</li><li>HR:</li><li>RR:</li><li>Pulse quality:</li><li>Other physical examination changes:</li><li>Sedation level: none / mild / adequate / excessive / dysphoric</li></ul><p><br></p><h4>IV CATHETER:</h4><ul><li>Size (gauge):</li><li>Right cephalic: ____</li><li>Left cephalic: ____</li><li>Right medial saphenous: ____</li><li>Left medial saphenous: ____</li><li>Right lateral saphenous: ____</li><li>Left Lateral Saphenous: ____</li><li>Other: ____</li></ul><p><br></p><h4>EQUIPMENT:</h4><ul><li>Anesthesia Machine Checklist completed: ____ Yes ____ No</li><li>Breathing circuit:</li><li class="ql-indent-1">Non-rebreathing (&lt;7kg): ____</li><li class="ql-indent-1">Rebreathing (&gt;7kg): Adult ____ Pediatric ____</li><li class="ql-indent-1">Bag size (L): ____</li></ul><p><br></p><p><br></p><h2>INDUCTION AND INTUBATION PHASE:</h2><ul><li>Preoxygenation administered: ____ Yes ____ No</li><li>If yes, record rate (L/min): ____</li><li>Method (flow by, mask, etc.): ____</li><li>Length of time (minutes): ____</li><li>Endotracheal tube size: ____ mm</li><li>Cuff inflated for leak test: ____ Yes ____ No</li></ul><p><br></p><h4>IV induction agent and concentration:</h4><ul><li>Quantity:</li><li>Time:</li><li>Administered by:</li></ul><p><br></p><p><br></p><h3>LOCAL AND REGIONAL BLOCKS (as medically indicated or required):</h3><ol><li><strong>Medication:</strong></li><li>Concentration (mg/mL):</li><li>Quantity (mL):</li><li>Route:</li><li>Time administered:</li><li>Administered by:</li></ol><p><br></p><p><br></p><h2>MAINTENANCE / MONITORING</h2><p>TimeSevo %O2 FlowFluids (mL/hr)HRRRPulse qualityCRT/MMTempSpO2ECG rhythmEtCO2SAPDAPMAP</p><h4>Interventions or remarks (including time):</h4><ul><li>Procedure/surgery start time:</li><li>Procedure end time:</li><li>Inhalant anesthesia end time:</li><li>100% O2 end time:</li><li>Total fluids administered during anesthesia:</li></ul><p><br></p><p><br></p><h4>PERIOPERATIVE MEDICATIONS ADMINISTERED:</h4><ol><li><strong>Medication:</strong></li><li>Concentration (mg/mL):</li><li>Quantity (mL):</li><li>Route:</li><li>Time administered:</li><li>Administered by:</li></ol><p><br></p><p><br></p><p>... (Content truncated for brevity) ...</p><p><br></p><p><br></p><h2>Canine Castration</h2><ul><li>Surgical site shaved and prepped with surgical scrub and alcohol.</li><li>Ventral midline incision cranial to scrotum.</li><li>Removed testicles as follows:</li><li>Subcutaneous closure as follows:</li><li>Skin closure as follows:</li><li>Suture material utilized:</li><li>Surgical complications noted or additional remarks:</li></ul><p><br></p><p><br></p><h2>Canine Spay - Ovariohysterectomy</h2><ul><li>Surgical site shaved and prepped with surgical scrub and alcohol.</li><li>____ cm ventral midline incision.</li><li>Ovaries and uterus excised and pedicles ligated as follows:</li><li>Closure of linea alba as follows:</li><li>Subcutaneous closure as follows:</li><li>Skin closure as follows:</li><li>Suture material utilized:</li></ul><p><br></p><p><br></p><h2>Dental Prophylaxis</h2><ul><li>All teeth scaled with an ultrasonic scaler, all teeth polished with prophy paste.</li><li>Examination of the oral cavity completed by the veterinarian including assessment of all teeth with a dental probe.</li></ul><p><br></p><h4>Dental Chart:</h4><ul><li>Calculus (0-4)</li><li>Gingivitis (0-4)</li><li>Periodontal Disease (0-4)</li></ul><p><br></p><p><br></p><h2>Feline Castration</h2><ul><li>Surgical site prepared and prepped with surgical scrub and alcohol.</li><li>Scrotal incision made over each testicle.</li><li>Testicular vessels and cord ligated as follows:</li><li>Surgical complications noted or additional remarks:</li></ul>`

export const canineCastration =  `<p>Canine Castration:</p><p><br></p><p>Surgical site shaved and prepped with surgical scrub and alcohol.</p><p><br></p><p>Ventral midline incision cranial to scrotum.</p><p><br></p><p>Removed testicles as follows:</p><p><br></p><p>Subcutaneous closure as follows:</p><p><br></p><p>Skin closure as follows:</p><p><br></p><p>Suture material utilized:</p><p><br></p><p>Surgical complications noted or additional remarks</p>`

export const canineSpay = `<p>Canine Spay - Ovariohysterectomy:</p><p><br></p><p>Surgical site shaved and prepped with surgical scrub and alcohol.</p><p><br></p><p> ____ cm ventral midline incision.</p><p><br></p><p>Ovaries and uterus excised and pedicles ligated as follows:</p><p><br></p><p>Closure of linea alba as follows: Subcutaneous closure as follows:</p><p><br></p><p>Skin closure as follows:</p><p><br></p><p>Suture material utilized:</p>`

export const dentalProphylaxis = `<p>Dental Prophylaxis:</p><p><br></p><p>All teeth scaled with an ultrasonic scaler, all teeth polished with prophy paste.</p><p>Examination of the oral cavity completed by the veterinarian including assessment of all teeth with dental probe.</p><p><br></p><p>Dental Chart:</p><p><br></p><p>Calculus (0-4)</p><p><br></p><p>Gingivitis (0-4)</p><p><br></p><p>Periodontal Disease (0-4)</p><p><br></p><p>Bite:</p><p><br></p><p>Oral Cavity:</p><p><br></p><p>Missing:</p><p><br></p><p>Retained:</p><p><br></p><p>Pathology:</p><p><br></p><p>[Fractured Closed/Open (FC/FO), Worn (W), Pockets (PK mm), Caries (C), Mobility (M1-3), Neck Lesion (NL), Root Exposure (RE)]</p><p><br></p><p>Radiograph Findings:</p><p><br></p><p>Extracted:</p><p><br></p><p>Extraction Surgical Notes:</p><p><br></p>`

export const felineCastration = `<p>Feline Castration:</p><p><br></p><p>Surgical site prepared and prepped with surgical scrub and alcohol.</p><p><br></p><p>Scrotal incision made over each testicle.</p><p><br></p><p>Testicular vessels and cord ligated as follows:</p><p><br></p><p>Surgical complications noted or additional remarks:</p><p><br></p>`