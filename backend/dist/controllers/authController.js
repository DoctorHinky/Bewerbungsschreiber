import bcrypt from "bcrypt"; // verschlüsselt Passwörter
import zxcvbn from "zxcvbn"; // bewertet Passwörter
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import { config } from "../config/config.js";
export const register = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body;
  // überprüfen der eingaben
  if (!username || !password || !passwordConfirmation) {
    return res.status(400).json({ message: "Fülle alle Felder aus!" });
  }
  if (password !== passwordConfirmation) {
    return res
      .status(400)
      .json({ message: "Passwort und bestätigung sind nicht gleich!" });
  }
  // bewerten des Passworts
  if (password.length < 8) {
    return res.status(400).json({ message: "Passwort is zu kurz!" });
  }
  const passwordStrength = zxcvbn(password);
  if (passwordStrength.score < 3) {
    return res.status(400).json({
      message:
        "Du schützt sensible Daten mit diesem Passwort, es sollte stärker sein.",
      suggestion: passwordStrength.feedback.suggestions.join(" ") || [
        "Das Passwort sollte ausgefallener sein, verwende keine zusammenhängenden Wörter oder Zahlenfolgen.",
      ],
    });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const stmt = db.prepare(
      "INSERT INTO users (username, password) VALUES (?, ?)"
    );
    stmt.run(username, hashedPassword); // speichern des Nutzers
    res.status(201).json({ message: "Neuer Nutzer erfolgreich erstllt!" });
  } catch (err) {
    return res.status(400).json({ message: "Nutzer existiert bereits!" });
  }
};
// das ist sehr schlecht geschreiben, die funktion ist nicht async sondern hat nur async um einen Fehler zu vermeiden
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = stmt.get(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ message: "Nutzername oder Passwort falsch!" });
    }
    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: "1h",
    });
    return res.status(201).json({ message: "Erfolgreich eingeloggt!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Interterner Serverfehler, (AuthControllers): ${err}` });
  }
};
